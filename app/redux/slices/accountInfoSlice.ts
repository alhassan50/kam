import { createSlice } from "@reduxjs/toolkit";

const initialState = false

const accountInfoSlice = createSlice({
    name: 'hasAccountInfoChanged',
    initialState,
    reducers: {
        toggleAccountInfoState: (state) => {
            return (!state)
        }
    }
})

export const selectHasAccountInfoChanged = (state: {accountInfoReducer: boolean}) => state.accountInfoReducer
export const {toggleAccountInfoState} = accountInfoSlice.actions
export default accountInfoSlice.reducer