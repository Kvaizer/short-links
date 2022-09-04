import {combineReducers} from "redux";
import thunk from "redux-thunk";
import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from './reducers/auth-reducer';
import {appReducer} from './reducers/app-reducer';
import {linksReducer} from './reducers/short-links-reducer';

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    links: linksReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})



// export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>

//@ts-ignore
window.store = store