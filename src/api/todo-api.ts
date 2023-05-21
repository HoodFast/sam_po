import axios from "axios";

let instance = axios.create(
    {
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.1/'
    }
)

export const todoAPI = {
    getToDoLists() {
        return instance.get<ResponseGetToDoType>('todo-lists').then((res) => res)
    },
    createToDoList(title: string) {
        return instance.post<ResponseType<{ item: ToDoType }>>('todo-lists', {title}).then((res) => res.data)
    },
    updateToDoTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title}).then((res) => res.data)
    },
    removeToDo(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`).then((res) => res.data)
    },
    getTasks(todolistId: string) {
        return instance.get<ResponseTasks>(`todo-lists/${todolistId}/tasks`).then(res=>res.data)
    },
    createTask(todolistId: string,title:string) {
        return instance.post<ResponseType<{item:TaskType}>>(`todo-lists/${todolistId}/tasks`,{title})
            .then(res=>res.data)
    },
    updateTask(todolistId: string, taskId:string, payload:updateTaskType) {
        return instance.put<ResponseType<{item:TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, payload)
            .then(res=>res.data)
    },
    removeTask(todolistId: string, taskId:string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
            .then(res=>res.data)
    }
}


//-------------------types

export type ToDoType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseGetToDoType = ToDoType[]

export type ResponseType<T = {}> = {
    resultCode: ResultCode
    messages: string[]
    data: T
}
export type TaskType = {
    description: string
    title: string
    completed: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type ResponseTasks = {
    items: TaskType[]
    totalCount: number
    error: string | null
}
type updateTaskType = {
    description?: string
    title?: string
    completed?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export enum ResultCode {
    OK = 0,
    Error=1,
    ERROR_CAPTCHA=10
}