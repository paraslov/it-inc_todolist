import {authAPI, TLoginParams} from '../../api/auth_api'
import {OperationResultCodes} from '../../api/api'
import {thunkServerCatchError, thunkServerResponseError} from '../../utils/thunk-errors-handle'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {commonAppActions} from '../CommonActions/commonAppActions'
import {TThunkApiConfigRejectedValue} from '../../store/types'

const {setAppStatus} = commonAppActions

//* ============================================================================================ Thunk Creators ======>>
const login = createAsyncThunk<undefined, { data: TLoginParams }, TThunkApiConfigRejectedValue>
('auth/login', async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        let data = await authAPI.login(payload.data)
        if (data.resultCode === OperationResultCodes.Success) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return
        } else {
            return thunkServerResponseError(data, thunkAPI)
        }
    } catch (error) {
        return thunkServerCatchError(error, thunkAPI)
    }
})

const logout = createAsyncThunk('auth/logout', async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        let data = await authAPI.logout()
        if (data.resultCode === OperationResultCodes.Success) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return
        } else {
            return thunkServerResponseError(data, thunkAPI)
        }
    } catch (error) {
        return thunkServerCatchError(error, thunkAPI)
    }
})

export const authAsyncActions = {login, logout}

//* ====== Reducer ===================================================================================================>>

export const slice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false
    },
    reducers: {
        setIsAuth(state, action: PayloadAction<{ isAuth: boolean }>) {
            state.isAuth = action.payload.isAuth
        }
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state) => {
            state.isAuth = true
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.isAuth = false
        })
    }
})

export const authReducer = slice.reducer
export const {setIsAuth} = slice.actions

