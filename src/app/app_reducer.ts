//* ====== Reducer ===================================================================================================>>
const initialState = {
    error: null as string | null,
    status: 'idle' as ResponseStatusType
}

export const appReducer = (state: AppReducerStateType = initialState, action: AppReducerActionsType): AppReducerStateType => {
    switch (action.type) {
        case 'SET-ERROR':
            return {...state, error: action.error}
        case 'SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}

//* ====== Action Creators ===========================================================================================>>
export const setAppStatus = (status: ResponseStatusType) => ({type: 'SET-STATUS', status} as const)
export const setAppError = (error: string | null) => ({type: 'SET-ERROR', error} as const)

//* ====== Types =====================================================================================================>>
export type ResponseStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppReducerStateType = typeof initialState

type AppReducerActionsType = ReturnType<typeof setAppError>
    | ReturnType<typeof setAppStatus>
