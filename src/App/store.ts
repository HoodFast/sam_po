import {applyMiddleware, combineReducers, legacy_createStore, AnyAction} from "redux";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch} from "react-redux";

const rootReducer = combineReducers({})

export type RootStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<RootStateType, any, AnyAction>
export const AppUseDispatch = () => useDispatch<AppThunkDispatch>()
export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
// @ts-ignore
window.store = store;