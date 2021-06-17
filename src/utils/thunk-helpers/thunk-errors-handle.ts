import {Dispatch} from 'redux';
import {setAppError, setAppStatus} from '../../app/app_reducer';
import {TOperationResult} from '../../api/api';


export const thunkServerResponseError = <D>(data: TOperationResult<D>, dispatch: ThunkErrorsHandleDispatchType) => {
    dispatch(setAppError(data.messages.length ? data.messages[0] : 'some error occurred'))
    dispatch(setAppStatus('failed'))
}

export const thunkServerCatchError = (error: any, dispatch: ThunkErrorsHandleDispatchType) => {
    dispatch(setAppError(error.message.length ? error.message : 'some error occurred'))
    dispatch(setAppStatus('failed'))
}

type ThunkErrorsHandleDispatchType = Dispatch<ReturnType<typeof setAppError> | ReturnType<typeof setAppStatus>>