import {todoAPI, ToDoType} from "../../api/todo-api";
import {Dispatch} from "redux";

export const ADD_TODO = 'ADD_TODO'
const FETCH_TODO = 'FETCH_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
const UPDATE_TODO_TITLE= 'UPDATE_TODO_TITLE'
const CHANGE_FILTER = 'CHANGE_FILTER'

export type FilterType = 'all'| 'active' | 'completed'
export type ToDoDomainType = ToDoType & { filter: FilterType }


export const todoListReducer = (state: ToDoDomainType[] = [], action: ToDoActionsType): ToDoDomainType[] => {
    switch (action.type) {
        case ADD_TODO:
            return [{...action.payload.toDoList, filter: 'all'},...state]
        case FETCH_TODO:
            return [...action.payload.toDoLists.map(tl => ({...tl, filter: 'all' as FilterType}))]
        case REMOVE_TODO:
            return state.filter(t => t.id !== action.payload.todoId)
        case UPDATE_TODO_TITLE:
            return state.map(i=>i.id===action.payload.todoId?{...i,title:action.payload.newTitle}:i)
        case CHANGE_FILTER:
            return state.map(i=> i.id===action.payload.todoId?{...i,filter:action.payload.filter}:i)
        default:
            return state
    }
}

export type ToDoActionsType =
    ReturnType<typeof addToDoAC>
    | ReturnType<typeof fetchToDoAC>
    | ReturnType<typeof removeTodoAC>
    | ReturnType<typeof updateTodoAC>
    | ReturnType<typeof changeFilterAC>


export const addToDoAC = (toDoList: ToDoType) => {
    return {type: ADD_TODO, payload: {toDoList}} as const
}
export const fetchToDoAC = (toDoLists: ToDoType[]) => {
    return {type: FETCH_TODO, payload: {toDoLists}} as const
}
export const removeTodoAC = (todoId: string) => {
    return {type: REMOVE_TODO, payload: {todoId}} as const
}

const updateTodoAC=(todoId: string,newTitle:string)=>{
    return {type:UPDATE_TODO_TITLE,payload:{todoId,newTitle}}as const
}

export const changeFilterAC=(todoId:string,filter:FilterType)=>{
    return {type:CHANGE_FILTER,payload:{todoId,filter}}as const
}
//-----thunks


export const fetchToDoLists = () => {
    return (dispatch: Dispatch) => {
        todoAPI.getToDoLists().then((data) => {
            dispatch(fetchToDoAC(data))
        })
    }
}

export const addTodo = (title: string) => {
    return (dispatch: Dispatch) => {
        todoAPI.createToDoList(title).then((data) => {
            dispatch(addToDoAC(data.data.item))
        })
    }
}

export const removeToDo = (todoId: string) => {
    return (dispatch: Dispatch) => {
        todoAPI.removeToDo(todoId).then((data)=>{
            dispatch(removeTodoAC(todoId))
        })
    }
}

export const updateTodoTitleTC=(todoId: string,newTitle:string)=>{
    return (dispatch:Dispatch)=>{
        todoAPI.updateToDoTitle(todoId,newTitle).then(data=>{
            console.log(data)
            dispatch(updateTodoAC(todoId,newTitle))
        })
    }
}