import axios from 'axios';
import {LoginRequestType} from './authAPI';

export const login_instance = axios.create({
    baseURL: 'http://79.143.31.216/',
    transformRequest: (data: LoginRequestType) => {
        return `username=${data.username}&password=${data.password}`
    },
    headers: {
        'Content-Type': 'application/json'
    }
})

export const instance = axios.create({
    baseURL: 'http://79.143.31.216/',
})
