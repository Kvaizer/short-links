import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type AppStatusType = 'succeeded' | 'failed' | 'empty' | 'inProgress'

type InitialStateType = {
    error: string | null,
    status: AppStatusType
}

const initialState: InitialStateType = {
    error: null,
    status: 'empty'
}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppError(state, action: PayloadAction<{error: string | null}>) {
            state.error = action.payload.error
        },
        setAppStatus(state, action: PayloadAction<{status: AppStatusType}>) {
            state.status = action.payload.status
        }
    }
})

export const appReducer = slice.reducer
export const {setAppError, setAppStatus} = slice.actions