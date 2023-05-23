import {TaskType, todoAPI} from "../../../api/todo-api";
import {Dispatch} from "redux";
import {ADD_TODO, addToDoAC} from "../todoList-reducer";

const FETCH_TASKS="FETCH_TASKS"

export type tasksStateType={
    [key:string]:TaskType[]
}
const initState:tasksStateType={}

export const taskReducer= (state=initState,action:TaskActionTypes)=>{
    switch (action.type){
        case FETCH_TASKS:
            return {...state,[action.payload.todoId]:action.payload.tasks}
        case ADD_TODO:
            return {...state,[action.payload.toDoList.id]:[]}
        default:
            return state
    }
}

type TaskActionTypes=ReturnType<typeof fetchTasksAC> | ReturnType<typeof addToDoAC>

export const fetchTasksAC=(todoId:string,tasks:TaskType[])=>{
    return {type:FETCH_TASKS,payload:{todoId,tasks}}as const
}


//----thunks

export const fetchTasks=(todoId:string)=>{
    return (dispatch:Dispatch)=>{
        todoAPI.getTasks(todoId).then((data)=>{
            dispatch(fetchTasksAC(todoId,data.items))
        })
    }
}