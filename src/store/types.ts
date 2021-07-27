import {TFieldError} from '../api/api'
import {rootReducer, store} from './store'

export type TRootReducer = typeof rootReducer
export type TAppState = ReturnType<TRootReducer>
export type TAppDispatch = typeof store.dispatch
export type TThunkApiConfigRejectedValue = { rejectValue: { errors: string[], fieldsErrors?: TFieldError[] } }