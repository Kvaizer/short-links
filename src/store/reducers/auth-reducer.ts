import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {authAPI, LoginRequestType} from '../../api/authAPI';
import { setAppError, setAppStatus } from './app-reducer';
import exp from 'constants';

type initialStateType = {
    isLoggedIn: boolean
    accessToken: string
}

const initialState: initialStateType = {
    isLoggedIn: false,
    accessToken: '',
}

export const login = createAsyncThunk<{access_token: string}, LoginRequestType, {rejectValue: {error: string}}>('auth/login', async (params, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'inProgress'}))
    try {
        const res = await authAPI.login(params) // set в Local storage
        localStorage.setItem('token', res.data.access_token)
        dispatch(setAppStatus({status: 'succeeded'}))
        return {access_token: res.data.access_token}
    } catch(e: any) {
        debugger
        console.log({...e})
        dispatch(setAppStatus({status: 'failed'}))
        dispatch(setAppError({error: e.message}))
       return rejectWithValue({error: e.message})
    }
})

export const registration = createAsyncThunk<unknown, {username: string, password: string}, {rejectValue: {error: string}}>('auth/registration', async (params, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'inProgress'}))
    try {
        await authAPI.registration(params)
        dispatch(setAppStatus({status: 'succeeded'}))
        return
    } catch(e: any) {
        dispatch(setAppStatus({status: 'failed'}))
        dispatch(setAppError({error: e.message}))
        return rejectWithValue({error: e.message})
    }
})

export const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedInFalse(state) {
            state.isLoggedIn = false
        }
    },
    extraReducers: (builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true
                state.accessToken = action.payload.access_token
            })
    })
})

export const authReducer = slice.reducer
export const {setIsLoggedInFalse} = slice.actions

