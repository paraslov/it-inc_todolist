import {authAPI, TLoginParams} from '../../api/auth_api';
import {TBaseThunk} from '../../app/store';
import {setAppError, setAppInitialized, setAppStatus} from '../../app/app_reducer';
import {OperationResultCodes} from '../../api/api';
import {thunkServerCatchError, thunkServerResponseError} from '../../utils/thunk-helpers/thunk-errors-handle';

//* ====== Reducer ===================================================================================================>>
const initState = {
    isAuth: false
}
export const authReducer = (state: TAuthReducerStateType = initState, action: TAuthActions) => {
    switch (action.type) {
        case 'para-slov/authReducer/SET-IS-AUTH':
            return {...state, isAuth: action.isAuth}
        default:
            return state
    }
}

//* ============================================================================================ Action Creators =====>>
export const setIsAuth = (isAuth: boolean) => ({type: 'para-slov/authReducer/SET-IS-AUTH', isAuth} as const)

//* ============================================================================================ Thunk Creators ======>>
export const login = (data: TLoginParams): TThunk => dispatch => {
    dispatch(setAppStatus('loading'))
    authAPI.login(data)
        .then(data => {
            if (data.resultCode === OperationResultCodes.Success) {
                dispatch(setIsAuth(true))
                dispatch(setAppStatus('succeeded'))
            } else {
                thunkServerResponseError(data, dispatch)
            }
        })
        .catch(error => {
            thunkServerCatchError(error, dispatch)
        })
}
export const logout = (): TThunk => dispatch => {
    dispatch(setAppStatus('loading'))
    authAPI.logout()
        .then(data => {
            if (data.resultCode === OperationResultCodes.Success) {
                dispatch(setIsAuth(false))
                dispatch(setAppStatus('succeeded'))
            } else {
                thunkServerResponseError(data, dispatch)
            }
        })
        .catch(error => {
            thunkServerCatchError(error, dispatch)
        })
}


//* ====================================================================================================== Types =====>>
export type TAuthReducerStateType = typeof initState

type TAuthActions = ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setIsAuth>
    | ReturnType<typeof setAppInitialized>

type TThunk = TBaseThunk<TAuthActions>