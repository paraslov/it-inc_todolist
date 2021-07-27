import {authAPI} from '../../api/auth_api'
import {OperationResultCodes} from '../../api/api'
import {thunkServerCatchError} from '../../utils/thunk-errors-handle'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {setIsAuth} from '../Login/auth_reducer'
import {commonAppActions} from '../CommonActions/commonAppActions'

const {setAppStatus} = commonAppActions

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
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(initializeApp.fulfilled, (state, action) => {
                state.isAppInitialized = action.payload.isAppInitialized
            })
            .addCase(commonAppActions.setAppError, (state, action) => {
                state.error = action.payload.error
            })
            .addCase(commonAppActions.setAppStatus, (state, action) => {
                state.status = action.payload.status
            })
    }
})


//* ======================================================================================================== Types ===>>
export type TResponseStatus = 'idle' | 'loading' | 'succeeded' | 'failed'