import {authAPI, TLoginParams} from '../../api/auth_api'
import {setAppStatus} from '../../app/app_reducer'
import {OperationResultCodes} from '../../api/api'
import {thunkServerCatchError, thunkServerResponseError} from '../../utils/thunk-helpers/thunk-errors-handle'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Dispatch} from 'redux'

//* ====== Reducer ===================================================================================================>>
const initState = {
    isAuth: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        setIsAuth(state, action: PayloadAction<{isAuth: boolean}>) {
            state.isAuth = action.payload.isAuth
        }
    }
})

export const authReducer = slice.reducer
export const {setIsAuth} = slice.actions


//* ============================================================================================ Thunk Creators ======>>
export const login = (data: TLoginParams) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    authAPI.login(data)
        .then(data => {
            if (data.resultCode === OperationResultCodes.Success) {
                dispatch(setIsAuth({isAuth: true}))
                dispatch(setAppStatus('succeeded'))
            } else {
                thunkServerResponseError(data, dispatch)
            }
        })
        .catch(error => {
            thunkServerCatchError(error, dispatch)
        })
}
export const logout = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    authAPI.logout()
        .then(data => {
            if (data.resultCode === OperationResultCodes.Success) {
                dispatch(setIsAuth({isAuth: false}))
                dispatch(setAppStatus('succeeded'))
            } else {
                thunkServerResponseError(data, dispatch)
            }
        })
        .catch(error => {
            thunkServerCatchError(error, dispatch)
        })
}
