import {RootStateType} from "../../App/store";
import {ToDoType} from "../../api/todo-api";

const ADD_TODO='ADD_TODO'

const init_state:ToDoType[]=[]

export const todoListReducer = (state=init_state,action:ActionsType): ToDoType[]=> {
    switch (action.type){
        case ADD_TODO:
            return state
    }
}

export type ActionsType = addToDoTypeAC

export type addToDoTypeAC=ReturnType<typeof addToDoAC>
export const addToDoAC=(title:string)=>{
    return {type:ADD_TODO,payload:{title}}as const
}