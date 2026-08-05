import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    photos: [],
    videos: [],
    gifs: [],
    loading: false,
    error: null,
}

const homeSlice = createSlice({

    name: 'home',

    initialState,

    reducers: {

        setLoading(state){
            state.loading = true;
            state.error = null;
        },

        setHomeData(state, action) {
            
            state.photos = action.payload.photos;
            state.videos = action.payload.videos;
            state.gifs = action.payload.gifs;
            state.loading = false
        },

        setError(state, action) {

            state.loading = false;
            state.error = action.payload;
        }

    },
})

export const {
    setError,
    setHomeData,
    setLoading
} = homeSlice.actions;

export default homeSlice.reducer;