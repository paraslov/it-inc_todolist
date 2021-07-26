import {Dispatch} from 'redux';
import {setAppError, setAppStatus} from '../../app/app_reducer';
import {TOperationResult} from '../../api/api';


export const thunkServerResponseError = <D>(data: TOperationResult<D>, dispatch: ThunkErrorsHandleDispatchType, showError = true) => {
    showError && dispatch(setAppError({error: data.messages.length ? data.messages[0] : 'some error occurred'}))
    dispatch(setAppStatus({status: 'failed'}))
}

export const thunkServerCatchError = (error: any, dispatch: ThunkErrorsHandleDispatchType, showError = true) => {
    showError && dispatch(setAppError(error.message.length ? error.message : 'some error occurred'))
    dispatch(setAppStatus({status: 'failed'}))
}

type ThunkErrorsHandleDispatchType = Dispatch<ReturnType<typeof setAppError> | ReturnType<typeof setAppStatus>>