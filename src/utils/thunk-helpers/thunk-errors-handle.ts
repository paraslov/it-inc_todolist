import {Dispatch} from 'redux'
import {setAppError, setAppStatus} from '../../app/app_reducer'
import {TOperationResult} from '../../api/api'
import {AxiosError} from 'axios'

// simplified type for thunkAPI from createAsyncThunk.ts types:
// BaseThunkAPI< S, E, D extends Dispatch = Dispatch, RejectedValue = undefined, RejectedMeta = unknown, FulfilledMeta = unknown>
type TSimplifiedThunkAPI = {
    dispatch: Function
    getState: Function
    extra: any
    requestId: string
    signal: AbortSignal
    rejectWithValue: Function
    fulfillWithValue: Function
}

export const thunkServerResponseError = <D>(data: TOperationResult<D>, thunkAPI: TSimplifiedThunkAPI, showError = true) => {
    showError && thunkAPI.dispatch(setAppError({error: data.messages.length ? data.messages[0] : 'some error occurred'}))
    thunkAPI.dispatch(setAppStatus({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
}

export const thunkServerCatchError = (error: AxiosError, thunkAPI: TSimplifiedThunkAPI, showError = true) => {
    showError && thunkAPI.dispatch(setAppError({error: error.message ? error.message : 'some error occurred'}))
    thunkAPI.dispatch(setAppStatus({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
}