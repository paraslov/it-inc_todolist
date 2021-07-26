import {Dispatch} from 'redux'
import {setAppError, setAppStatus} from '../../app/app_reducer'
import {TOperationResult} from '../../api/api'
import {AxiosError} from 'axios'


export const thunkServerResponseError = <D>(data: TOperationResult<D>, dispatch: ThunkErrorsHandleDispatchType, showError = true) => {
    showError && dispatch(setAppError({error: data.messages.length ? data.messages[0] : 'some error occurred'}))
    dispatch(setAppStatus({status: 'failed'}))
}

export const thunkServerCatchError = (error: AxiosError, thunkAPI: any, showError = true) => {
    showError && thunkAPI.dispatch(setAppError({error: error.message ? error.message : 'some error occurred'}))
    thunkAPI.dispatch(setAppStatus({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
}

type ThunkErrorsHandleDispatchType = Dispatch<ReturnType<typeof setAppError> | ReturnType<typeof setAppStatus>>