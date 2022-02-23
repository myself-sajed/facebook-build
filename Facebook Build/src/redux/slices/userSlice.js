import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isUser: localStorage.getItem('isUser'),
    random: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setIsUser: (state, action) => {
            state.isUser = action.payload
        },
        setRandom: (state, action) => {
            state.random = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUser, setIsUser, setRandom } = userSlice.actions

export default userSlice.reducer