import {instance, login_instance} from './instance';

type ErrorResponseType = {
    detail: [
        {
            loc: string[]
            msg: string,
            type: string
        }
    ]
}

export type LoginRequestType = {
       username: string
       password: string
}

export const authAPI = {
    registration(params: {username: string, password: string}) {
        return instance.post<{username: string} | ErrorResponseType>(`register?username=${params.username}&password=${params.password}`)
    },

    login(params: LoginRequestType) {
        return login_instance.post<{access_token: string, token_type: string}>(`login`, params)
    }
}