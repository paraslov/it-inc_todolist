import {createAction} from '@reduxjs/toolkit'
import {TResponseStatus} from '../App/app_reducer'


const setAppError = createAction<{ error: string | null }>('app/setAppError')
const setAppStatus = createAction<{ status: TResponseStatus }>('app/setAppStatus')

export const commonAppActions = {
    setAppError,
    setAppStatus
}
