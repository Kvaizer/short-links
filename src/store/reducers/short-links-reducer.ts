import {GetParamsType, linksAPI, LinkType} from '../../api/linksAPI';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {setAppError, setAppStatus} from './app-reducer';

type InitialStateType = {
    links: LinkType[]
    totalAmountOfLinks: number
    currentShortLink: string
}

export const initialState: InitialStateType = {
    links: [],
    totalAmountOfLinks: 0,
    currentShortLink: ''
}

export const getLinks = createAsyncThunk<{links: LinkType[]}, GetParamsType, {rejectValue: {error: string}}>('links/getLinks', async (params, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'inProgress'}))
    try {
        const res = await linksAPI.getLinks(params)
        dispatch(setAppStatus({status: 'succeeded'}))
        return {links: res.data}
    } catch(e: any) {
        dispatch(setAppStatus({status: 'failed'}))
        dispatch(setAppError({error: e.message}))
        return rejectWithValue({error: e.message})
    }
})

export const getTotalAmountOfLinks = createAsyncThunk<{totalAmountOfLinks: number}, GetParamsType, {rejectValue: {error: string}}>('links/totalAmountOfLinks', async (params, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'inProgress'}))
    try {
        const res = await linksAPI.getLinks(params)
        dispatch(setAppStatus({status: 'succeeded'}))
        return {totalAmountOfLinks: res.data.length}
    } catch(e: any) {
        dispatch(setAppStatus({status: 'failed'}))
        dispatch(setAppError({error: e.message}))
        return rejectWithValue({error: e.message})
    }
})

export const squeezeLink = createAsyncThunk<{squeezedLink: string}, {token: string, link: string}, {rejectValue: {error: string}}>('links/squeeze', async (params, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'inProgress'}))
    try {
        const res = await linksAPI.squeezeLink(params)
        dispatch(setAppStatus({status: 'succeeded'}))
        return {squeezedLink: res.data.short}
    } catch(e: any) {
        dispatch(setAppStatus({status: 'failed'}))
        dispatch(setAppError({error: e.message}))
        return rejectWithValue({error: e.message})
    }
})

const slice = createSlice({
    name: 'links',
    initialState,
    reducers: {
        clearCurrentShortLink(state) {
            state.currentShortLink = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLinks.fulfilled, (state, action) => {
                state.links = action.payload.links
            })
            .addCase(getTotalAmountOfLinks.fulfilled, (state, action) => {
                state.totalAmountOfLinks = action.payload.totalAmountOfLinks
            })
            .addCase(squeezeLink.fulfilled, (state, action) => {
                state.currentShortLink = action.payload.squeezedLink
            })
    }
})

export const linksReducer = slice.reducer
export const {clearCurrentShortLink} = slice.actions