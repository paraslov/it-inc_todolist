import {instance, TOperationResult} from './api';


export type TLoginParams = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
type TAuthMeResponse = {
    id: number
    email: string
    login: string
}
export const authAPI = {
    login(data: TLoginParams) {
        instance.post<TOperationResult<{userId: number}>>('auth/login', data).then(res => res.data)
    },
    logout() {
        instance.delete<TOperationResult>('auth/login').then(res => res.data)
    },
    authMe() {
        instance.get<TOperationResult<TAuthMeResponse>>('auth/me').then(res => res.data)
    }
}