import axios from "axios";

let instance = axios.create(
    {
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.1/'
    }
)

export const todoAPI = {
    getToDoLists() {
        return instance.get<ResponseGetToDoType>('todo-lists').then((res)=>res)
    },
    createToDoList(title:string) {
      return instance.post<ResponseType<{item:ToDoType}>>('todo-lists',{title})  .then((res)=>res.data)
    },
    updateToDoTitle(todolistId:string,title:string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`,{title}).then((res)=>res.data)
    },
    removeToDo(todolistId:string) {
        return instance.delete(`todo-lists/${todolistId}`).then((res)=>res.data)
    },
}


//-------------------types

export type ToDoType={
    id:string
    addedDate:string
    order:number
    title:string
}

export type ResponseGetToDoType=ToDoType[]
export type ResponseType<T = {}> = {
    resultCode:number
    messages:string[]
    fieldsErrors:string[]
    data:T
}