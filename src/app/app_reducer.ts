import {authAPI} from '../api/auth_api'
import {OperationResultCodes} from '../api/api'
import {thunkServerCatchError} from '../utils/thunk-helpers/thunk-errors-handle'
import {setIsAuth} from '../features/Login/auth_reducer'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'

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
        thunkServerCatchError(error, thunkAPI.dispatch)
    }
})

//* ================================================================================================= Reducer ========>>
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
        }
    },
    extraReducers: builder => {
        builder.addCase(initializeApp.fulfilled, (state, action) => {
            if(action.payload) {
                state.isAppInitialized = action.payload.isAppInitialized
            }
        })
    }
})

export const appReducer = slice.reducer
export const {setAppStatus, setAppError} = slice.actions


//* ======================================================================================================== Types ===>>
export type TResponseStatus = 'idle' | 'loading' | 'succeeded' | 'failed'