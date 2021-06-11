//* ====== Reducer ===================================================================================================>>
const initialState = {
    error: null as string | null,
    status: 'idle' as ResponseStatusType
}

export const appReducer = (state: AppInitStateType = initialState, action: AppReducerActionsType): AppInitStateType => {
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
export const setStatus = (status: ResponseStatusType) => ({type: "SET-STATUS", status} as const)
export const setError = (error: string | null) => ({type: "SET-ERROR", error} as const)

//* ====== Types =====================================================================================================>>
export type ResponseStatusType = 'idle' | 'loading' | 'failed'
type AppInitStateType = typeof initialState
type AppReducerActionsType = ReturnType<typeof setError>
    | ReturnType<typeof setStatus>
