//* ================================================================================================= Reducer ========>>
import {authAPI} from '../api/auth_api'
import {OperationResultCodes} from '../api/api'
import {thunkServerCatchError} from '../utils/thunk-helpers/thunk-errors-handle'
import {setIsAuth} from '../features/Login/auth_reducer'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
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
        setAppError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatus(state, action: PayloadAction<{ status: TResponseStatus }>) {
            state.status = action.payload.status
        },
        setAppInitialized(state, action: PayloadAction<{ isAppInitialized: boolean }>) {
            state.isAppInitialized = action.payload.isAppInitialized
        }
    }
})

export const appReducer = slice.reducer
export const {setAppStatus, setAppError, setAppInitialized} = slice.actions

//* ============================================================================================ Thunk Creators ======>>
export const initializeApp = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    authAPI.authMe()
        .then(data => {
            if (data.resultCode === OperationResultCodes.Success) {
                dispatch(setIsAuth({isAuth: true}))
                dispatch(setAppInitialized({isAppInitialized: true}))
                dispatch(setAppStatus({status: 'succeeded'}))
            } else {
                dispatch(setAppStatus({status: 'failed'}))
                dispatch(setAppInitialized({isAppInitialized: true}))
            }
        })
        .catch(error => {
            thunkServerCatchError(error, dispatch)
        })
}

//* ======================================================================================================== Types ===>>
export type TResponseStatus = 'idle' | 'loading' | 'succeeded' | 'failed'