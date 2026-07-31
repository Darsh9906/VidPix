import axios from 'axios';

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const PEXELS_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const GIPHY_KEY = import.meta.env.VITE_GIPHY_API_KEY;


export const fetchPhoto = async (query,page=1,per_page=20) => {

const response = await axios.get(`https://api.unsplash.com/search/photos`,{
    params:{query,page,per_page},
    headers:{Authorization: `Client-ID ${UNSPLASH_KEY}`}
})

return response.data

}


export const fetchVideo = async (query,page=1,per_page=20) => {

  const response = await axios.get(`https://api.pexels.com/videos/search`,{

    params:{query,page,per_page},
    headers:{Authorization: `Client-ID ${PEXELS_KEY}`}
  })

  return response.data
  

}

export const fetchGif = async (query) => {

  const response = await axios.get('https://api.giphy.com/v1/gifs/search',{

    params:{ api_key: GIPHY_KEY,
          q: query,
          limit: 20,
        }
  })


  return response.data
  

}