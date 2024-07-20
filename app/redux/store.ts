import { configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "./slices/sideBarSlice";
import authReducer from './slices/authSlice'

export const store = configureStore({
    reducer: {
        sideBarReducer,
        authReducer
    }
})