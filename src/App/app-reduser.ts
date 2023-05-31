const APP_SET_ERROR = 'APP_SET_ERROR'
const APP_SET_STATUS = 'APP_SET_STATUS'

export type statusType = 'idle' | 'error' | 'success'|'loading'

export type InitStateType = {
    status: statusType
    error: string | null
}

const initState: InitStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state=initState, action: actionType):InitStateType => {
    switch (action.type) {
        case APP_SET_ERROR:
            return {...state, error: action.payload.error}
        case APP_SET_STATUS:
            return {...state, status: action.payload.status}
        default:
            return state
    }
}


type actionType = ReturnType<typeof setErrorAC>
    | ReturnType<typeof setStatusAC>

export const setErrorAC = (error: string) => {
    return {type: APP_SET_ERROR, payload: {error}} as const
}

export const setStatusAC = (status: statusType) => {

    return {type: APP_SET_STATUS, payload: {status}} as const
}
