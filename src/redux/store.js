import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/searchSlice"
import collectionReducer from "./features/collectionSlice"
import homeReducer from './features/homeSlice'


export const store = configureStore({
    reducer: {
        search: searchReducer,
        collection: collectionReducer,
        home : homeReducer
    }
})