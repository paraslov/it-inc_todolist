import axios from 'axios'


export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': '518b0738-7ca3-4f1f-b3b6-a549590182a8'
    }
})

//* common api types: ===========================================================================================>>
export type TOperationResult<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

//* Result codes enum: ===========================================================================================>>
export enum APIRequestsResultCodes {
    Success = 0,
    Error = 1
}

