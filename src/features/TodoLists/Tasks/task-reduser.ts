import {TaskPriorities, TaskStatuses, TaskType, todoAPI} from "../../../api/todo-api";
import {Dispatch} from "redux";
import {ADD_TODO, addToDoAC, REMOVE_TODO, removeTodoAC} from "../todoList-reducer";
import {RootStateType} from "../../../App/store";

const FETCH_TASKS = "FETCH_TASKS"
const CREATE_TASK = "CREATE_TASK"
const REMOVE_TASK = "REMOVE_TASK"
const UPDATE_TASK = "UPDATE_TASK"

export type tasksStateType = {
    [key: string]: TaskType[]
}
const initState: tasksStateType = {}

export const taskReducer = (state = initState, action: TaskActionTypes): tasksStateType => {
    switch (action.type) {
        case FETCH_TASKS:
            return {...state, [action.payload.todoId]: action.payload.tasks}
        case ADD_TODO:
            return {...state, [action.payload.toDoList.id]: []}
        case REMOVE_TODO:
            delete state[action.payload.todoId]
            return {...state}
        case CREATE_TASK:
            return {...state, [action.payload.todoId]: [...state[action.payload.todoId], action.payload.task]}
        case REMOVE_TASK:
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].filter(i => i.id !== action.payload.taskId)
            }
        case UPDATE_TASK:
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].map(i => i.id === action.payload.taskId ? {
                    ...i,
                    title: action.payload.newTitle
                } : i)
            }
        default:
            return state
    }
}

type TaskActionTypes =
    ReturnType<typeof fetchTasksAC>
    | ReturnType<typeof addToDoAC>
    | ReturnType<typeof removeTodoAC>
    | ReturnType<typeof createTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>


const fetchTasksAC = (todoId: string, tasks: TaskType[]) => {
    return {type: FETCH_TASKS, payload: {todoId, tasks}} as const
}
const createTaskAC = (todoId: string, task: TaskType) => {
    return {type: CREATE_TASK, payload: {todoId, task}} as const
}
const removeTaskAC = (todoId: string, taskId: string) => {
    return {type: REMOVE_TASK, payload: {todoId, taskId}} as const
}

const updateTaskAC = (todoId: string, taskId: string, newTitle: string) => {
    return {type: UPDATE_TASK, payload: {todoId, taskId, newTitle}} as const
}


//----thunks

export const fetchTasks = (todoId: string) => {
    return (dispatch: Dispatch) => {
        todoAPI.getTasks(todoId).then((data) => {
            dispatch(fetchTasksAC(todoId, data.items))
        })
    }
}

export const createTaskTC = (todoId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todoAPI.createTask(todoId, title).then(data => {
            const task = data.data.item
            dispatch(createTaskAC(todoId, task))
        })
    }
}

export const removeTaskTC = (todoId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todoAPI.removeTask(todoId, taskId).then(data => {
            dispatch(removeTaskAC(todoId, taskId))
        })
    }
}


export const updateTaskTC = (todoId: string, taskId: string, title: string) => {
    return (dispatch: Dispatch, getState: () => RootStateType) => {
        const task = getState().tasks[todoId].find(i => i.id === taskId)
        if (task) {
            const updateTask: TaskType = {...task, title: title}
            todoAPI.updateTask(todoId, taskId, updateTask).then(data => {
                if (data.resultCode === 0) {
                    dispatch(updateTaskAC(data.data.item.todoListId, data.data.item.id, data.data.item.title))
                }
            })
        }
    }
}