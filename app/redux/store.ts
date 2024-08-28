import { configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "./slices/sideBarSlice";
import authReducer from './slices/authSlice'
import accountInfoReducer from './slices/accountInfoSlice'

export const store = configureStore({
    reducer: {
        sideBarReducer,
        authReducer,
        accountInfoReducer
    }
})