import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    stories: null,
}

export const storySlice = createSlice({
    name: 'stories',
    initialState,
    reducers: {
        setStories: (state, action) => {
            state.stories = action.payload
        }
    },

})

// Action creators are generated for each case reducer function
export const { setStories } = storySlice.actions

export default storySlice.reducer