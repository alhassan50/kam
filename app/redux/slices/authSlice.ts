import { createSlice } from "@reduxjs/toolkit";

const initialState = false

const authSlice = createSlice({
    name: 'isLoggedIn',
    initialState,
    reducers: {
        toggleAuthState: (state) => {
            console.log(state)
            return (!state)
        }
    }
})

export const selectisLoggedIn = (state: {authReducer: boolean}) => state.authReducer
export const {toggleAuthState} = authSlice.actions
export default authSlice.reducer