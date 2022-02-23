import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: true,
}

export const loadingSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading = true
        },
        stopLoading: (state) => {
            state.isLoading = false
        }
    },
})

// Action creators are generated for each case reducer function
export const { startLoading, stopLoading } = loadingSlice.actions

export default loadingSlice.reducer