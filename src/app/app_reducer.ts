import {authAPI} from '../api/auth_api'
import {OperationResultCodes} from '../api/api'
import {thunkServerCatchError} from '../utils/thunk-errors-handle'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {setIsAuth} from '../features/Login/auth_reducer'

//* ============================================================================================ Thunk Creators ======>>

export const initializeApp = createAsyncThunk('app/initializeApp', async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        const data = await authAPI.authMe()
        if (data.resultCode === OperationResultCodes.Success) {
            thunkAPI.dispatch(setIsAuth({isAuth: true}))
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {isAppInitialized: true}
        } else {
            thunkAPI.dispatch(setAppStatus({status: 'failed'}))
            return {isAppInitialized: true}
        }
    } catch (error) {
        return thunkServerCatchError(error, thunkAPI)
    }
})

export const appAsyncActions = {initializeApp}

//* ================================================================================================= Reducer ========>>


export const slice = createSlice({
    name: 'app',
    initialState: {
        error: null as string | null,
        status: 'idle' as TResponseStatus,
        isAppInitialized: false,
    },
    reducers: {
        setAppError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatus(state, action: PayloadAction<{ status: TResponseStatus }>) {
            state.status = action.payload.status
        }
    },
    extraReducers: builder => {
        builder.addCase(initializeApp.fulfilled, (state, action) => {
            state.isAppInitialized = action.payload.isAppInitialized
        })
    }
})

export const {setAppStatus, setAppError} = slice.actions


//* ======================================================================================================== Types ===>>
export type TResponseStatus = 'idle' | 'loading' | 'succeeded' | 'failed'