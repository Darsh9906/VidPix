import { createSlice } from '@reduxjs/toolkit'


const homeSlice = createSlice({

    name: 'home',

    initialState: {
        photos: [],
        videos: [],
        gifs: [],
        loading: false,
        error: null
    },

    reducers: {

        setLoading: (state) => {
            state.loading = true
            state.error = null
        },

        setHomeData: (state, action) => {

            state.photos = action.payload.photos
            state.videos = action.payload.videos
            state.gifs = action.payload.gifs

            state.loading = false
            state.error = null
        }

    }

})


export const {
    setLoading,
    setHomeData
} = homeSlice.actions


export default homeSlice.reducer