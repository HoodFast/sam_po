import {todoAPI, ToDoType} from "../../api/todo-api";
import {Dispatch} from "redux";

export const ADD_TODO = 'ADD_TODO'
const FETCH_TODO = 'FETCH_TODO'

type ToDoDomainType = ToDoType & { filter: string }


export const todoListReducer = (state: ToDoDomainType[] = [], action: ToDoActionsType): ToDoDomainType[] => {
    switch (action.type) {
        case ADD_TODO:
            return [...state, {...action.payload.toDoList,filter:'all'}]
        case FETCH_TODO:
            return [...action.payload.toDoLists.map(tl => ({...tl, filter: 'all'}))]
        default:
            return state
    }
}

export type ToDoActionsType =
    ReturnType<typeof addToDoAC>
    | ReturnType<typeof fetchToDoAC>


export const addToDoAC = (toDoList:ToDoType) => {
    return {type: ADD_TODO, payload: {toDoList}} as const
}
export const fetchToDoAC = (toDoLists: ToDoType[]) => {

    return {type: FETCH_TODO, payload: {toDoLists}} as const
}
//-----thunks


export const fetchToDoLists = () => {
    return (dispatch: Dispatch) => {
        todoAPI.getToDoLists().then((data) => {
            dispatch(fetchToDoAC(data))
        })
    }
}

export const addTodo = (title:string)=>{
    return (dispatch:Dispatch)=>{
        todoAPI.createToDoList(title).then((data)=>{
            dispatch(addToDoAC(data.data.item))
        })
    }
}