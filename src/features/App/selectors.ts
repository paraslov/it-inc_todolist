import {TAppState} from '../../store/types'


export const selectAppStatus = (state: TAppState) => state.app.status
export const selectAppError = (state: TAppState) => state.app.error
export const selectIsAppInitialized = (state: TAppState) => state.app.isAppInitialized