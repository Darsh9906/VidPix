import axios from 'axios'

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_API_KEY
const PEXELS_KEY = import.meta.env.VITE_PEXELS_API_KEY
const GIPHY_KEY = import.meta.env.VITE_GIPHY_API_KEY


// SEARCH PHOTOS

export const fetchPhoto = async (
    query,
    page = 1,
    per_page = 20
) => {

    const response = await axios.get(
        'https://api.unsplash.com/search/photos',
        {
            params: {
                query,
                page,
                per_page
            },
            headers: {
                Authorization: `Client-ID ${UNSPLASH_KEY}`
            }
        }
    )

    return response.data
}


// SEARCH VIDEOS

export const fetchVideo = async (
    query,
    page = 1,
    per_page = 20
) => {

    const response = await axios.get(
        'https://api.pexels.com/videos/search',
        {
            params: {
                query,
                page,
                per_page
            },
            headers: {
                Authorization: PEXELS_KEY
            }
        }
    )

    return response.data
}


// SEARCH GIFS

export const fetchGif = async (
    query,
    page = 1,
    per_page = 20
) => {

    const response = await axios.get(
        'https://api.giphy.com/v1/gifs/search',
        {
            params: {
                api_key: GIPHY_KEY,
                q: query,
                limit: per_page,
                offset: (page - 1) * per_page
            }
        }
    )

    return response.data
}


// EXPLORE PHOTOS

export const fetchRandomPhotos = async (
    page = 1,
    per_page = 10
) => {

    const response = await axios.get(
        'https://api.unsplash.com/photos',
        {
            params: {
                page,
                per_page
            },
            headers: {
                Authorization: `Client-ID ${UNSPLASH_KEY}`
            }
        }
    )

    return response.data
}


// EXPLORE VIDEOS

export const fetchRandomVideos = async (
    page = 1,
    per_page = 10
) => {

    const response = await axios.get(
        'https://api.pexels.com/videos/popular',
        {
            params: {
                page,
                per_page
            },
            headers: {
                Authorization: PEXELS_KEY
            }
        }
    )

    return response.data
}


// EXPLORE GIFS

export const fetchRandomGif = async (
    offset = 0,
    limit = 10
) => {

    const response = await axios.get(
        'https://api.giphy.com/v1/gifs/trending',
        {
            params: {
                api_key: GIPHY_KEY,
                limit,
                offset
            }
        }
    )

    return response.data
}