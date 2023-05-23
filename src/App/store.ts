import {applyMiddleware, combineReducers, legacy_createStore, AnyAction} from "redux";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {todoListReducer} from "../features/TodoLists/todoList-reducer";
import {taskReducer} from "../features/TodoLists/Tasks/task-reduser";

const rootReducer = combineReducers({
    toDoLists:todoListReducer,
    tasks:taskReducer
})

export type RootStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<RootStateType, any, AnyAction>
export const AppUseDispatch = () => useDispatch<AppThunkDispatch>()
export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
// @ts-ignore
window.store = store;