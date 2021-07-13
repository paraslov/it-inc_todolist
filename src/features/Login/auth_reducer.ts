import {authAPI, TLoginParams} from '../../api/auth_api'
import {setAppStatus} from '../../app/app_reducer'
import {OperationResultCodes, TFieldError} from '../../api/api'
import {thunkServerCatchError, thunkServerResponseError} from '../../utils/thunk-helpers/thunk-errors-handle'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AxiosError} from 'axios'

//* ============================================================================================ Thunk Creators ======>>
export const login = createAsyncThunk<{isAuth: boolean}, {data: TLoginParams}, {
    rejectValue: {errors: string[], fieldsErrors?: TFieldError[]}
}>('auth/login', async (payload , thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        let data = await authAPI.login(payload.data)
        if (data.resultCode === OperationResultCodes.Success) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {isAuth: true}
        } else {
            thunkServerResponseError(data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
        }
    } catch (err) {
        const error: AxiosError = err
        thunkServerCatchError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})

export const logout = createAsyncThunk('auth/logout', async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        let data = await authAPI.logout()
        if (data.resultCode === OperationResultCodes.Success) {
            thunkAPI.dispatch(setIsAuth({isAuth: false}))
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            thunkServerResponseError(data, thunkAPI.dispatch)
        }
    } catch (error) {
        thunkServerCatchError(error, thunkAPI.dispatch)
    }
})

//* ====== Reducer ===================================================================================================>>
const initState = {
    isAuth: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        setIsAuth(state, action: PayloadAction<{ isAuth: boolean }>) {
            state.isAuth = action.payload.isAuth
        }
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.isAuth = action.payload.isAuth
        })
    }
})

export const authReducer = slice.reducer
export const {setIsAuth} = slice.actions

