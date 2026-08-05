import Loader from './Loader'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRandomGif, fetchRandomPhotos, fetchRandomVideos } from '../api/mediaApi'
import { setHomeData, setLoading } from '../redux/features/homeSlice'
import ErrorState from './ErrorState'
import ResultCard from './ResultCard'

const ExploreFeed = () => {

  const dispatch = useDispatch()

  const { photos, videos, gifs, loading, error } = useSelector((state) => state.home)


  useEffect(() => {

    const fetchHomeData = async () => {

      dispatch(setLoading())

      const data = await fetchRandomPhotos();


      const photos = data.map((item) => ({

        id: item.id,
        type: "photo",
        title: item.alt_description,
        thumbnail: item.urls.thumb,
        src: item.urls.full,
        url: item.links.html,
      }));


      const data2 = await fetchRandomVideos();

      const videos = data2.videos.map((item) => ({

        id: item.id,
        type: 'video',
        title: item.user.name || 'video',
        thumbnail: item.image,
        src: item.video_files[0].link,
        url: item.url
      }));


      const data3 = await fetchRandomGif();

      console.log(data3.data);
      

      const gifs = data3.data.map((item) => ({

        id: item.id,
        type: 'gif',
        title: item.title || 'GIF',
        thumbnail: item.images.downsized.url,
        src: item.url,
        url: item.url
      }))


      dispatch(
        setHomeData({
          photos,
          videos,
          gifs
        })

      )
    }

    fetchHomeData();

  }, []);

  if (loading) {
    return <div className='flex justify-center items-center py-30'> <Loader /></div>
  }

  if (error) {
    return <h1><ErrorState /></h1>
  }


  return (
    <div className='px-6'>
      <h1 className='text-3xl text-white font-bold mb-5'>
       Only Trendings
      </h1>

      <div className='flex justify-start flex-wrap gap-4'>
        {photos.map((item) => (
          <ResultCard key={item.id} item={item} />
        ))}


        {videos.map((item) => (
          <ResultCard key={item.id} item={item} />
        ))}

        {gifs.map((item)=> (
          <ResultCard key={item.id} item={item} />
        ))}

        
      </div>

    </div>

  )
}

export default ExploreFeed