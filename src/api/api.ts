import axios from 'axios'


export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': '00162dc2-204e-4559-bcf6-6384570c4ef5'
    }
})

//* common api types: ===========================================================================================>>
export type CommonResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

