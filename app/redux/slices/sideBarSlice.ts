import { createSlice } from "@reduxjs/toolkit";

const initialState = true

const sideBarSlice = createSlice({
    name: 'isSideBarOpened',
    initialState,
    reducers: {
        toggleSideBar: (state) => {
            return (!state)
        }
    }
})

export const selectisSideBarOpened = (state: {sideBarReducer: boolean}) => state.sideBarReducer
export const {toggleSideBar} = sideBarSlice.actions
export default sideBarSlice.reducer