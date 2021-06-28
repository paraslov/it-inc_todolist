//* ================================================================================================= Reducer ========>>
import {authAPI} from '../api/auth_api';
import {OperationResultCodes} from '../api/api';
import {thunkServerCatchError} from '../utils/thunk-helpers/thunk-errors-handle';
import {setIsAuth} from '../features/Login/auth_reducer';
import {TBaseThunk} from './store';
import {createSlice} from '@reduxjs/toolkit'
import {Dispatch} from 'redux'

const initialState = {
    error: null as string | null,
    status: 'idle' as TResponseStatus,
    isAppInitialized: false,
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {

    }
})

export const appReducer = (state: TAppReducerState = initialState, action: TAppActions): TAppReducerState => {
    switch (action.type) {
        case 'para-slov/appReducer/SET-ERROR':
            return {...state, error: action.error}
        case 'para-slov/appReducer/SET-STATUS':
            return {...state, status: action.status}
        case 'para-slov/appReducer/SET-APP-INITIALIZED':
            return {...state, isAppInitialized: action.isAppInitialized}
        default:
            return state
    }
}

//* ============================================================================================= Action Creators ====>>
export const setAppStatus = (status: TResponseStatus) => ({type: 'para-slov/appReducer/SET-STATUS', status} as const)
export const setAppError = (error: string | null) => ({type: 'para-slov/appReducer/SET-ERROR', error} as const)
export const setAppInitialized = (isAppInitialized: boolean) =>
    ({type: 'para-slov/appReducer/SET-APP-INITIALIZED', isAppInitialized} as const)

//* ============================================================================================ Thunk Creators ======>>
export const initializeApp = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    authAPI.authMe()
        .then(data => {
            if (data.resultCode === OperationResultCodes.Success) {
                dispatch(setIsAuth({isAuth: true}))
                dispatch(setAppInitialized(true))
                dispatch(setAppStatus('succeeded'))
            } else {
                dispatch(setAppStatus('failed'))
                dispatch(setAppInitialized(true))
            }
        })
        .catch(error => {
            thunkServerCatchError(error, dispatch)
        })
}

//* ======================================================================================================== Types ===>>
export type TResponseStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export type TAppReducerState = typeof initialState

type TAppActions = ReturnType<typeof setAppError>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppInitialized>