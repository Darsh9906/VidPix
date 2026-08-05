import React, { useEffect } from 'react'
import { fetchPhoto, fetchGif, fetchVideo } from '../api/mediaApi'
import { setResults, setError, setLoading } from '../redux/features/searchSlice'
import { useDispatch, useSelector } from 'react-redux'
import ResultCard from './ResultCard'
import Loader from './Loader'
import ErrorState from './ErrorState'

const ResultGrid = () => {

    const dispatch = useDispatch()
    const { query, activeTab, results, loading, error } = useSelector((store) => store.search)

    useEffect(() => {
        if(!query) return
        const getData = async () => {

            try {

                dispatch(setLoading())
                let data = []

                if (activeTab == 'photos') {
                    let response = await fetchPhoto(query)
                    

                    data = response.results.map((item) => ({

                        id: item.id,
                        type: 'photo',
                        title: item.alt_description,
                        thumbnail: item.urls.thumb,
                        src: item.urls.full,
                        url: item.links.html
                    }))
                }

                if (activeTab == 'videos') {
                    let response = await fetchVideo(query)
                    
                    data = response.videos.map((item) => ({

                        id: item.id,
                        type: 'video',
                        title: item.user.name || 'video',
                        thumbnail: item.image,
                        src: item.video_files[0].link,
                        url:item.url
                    }))

                }

                if (activeTab == 'gif') {
                    let response = await fetchGif(query)
                    
                    console.log(response.data);
                    
                     
                    data = response.data.map((item) => ({

                        id: item.id,
                        type: 'gif',
                        title: item.title || 'GIF',
                        thumbnail: item.images.downsized.url,
                        src: item.url,
                        url: item.url

                        
                    }))


                }

                dispatch(setResults(data))

            } catch (err) {

                dispatch(setError(err.message))
            }

        }

        getData()

    }, [query, activeTab,dispatch])


    if (error) return <h1 className='flex justify-center items-center '><ErrorState /></h1>

    if (loading) return <h1 className='flex justify-center items-center py-20'><Loader /></h1>


    return (
        <div className='flex justify-between flex-wrap gap-4 overflow-auto px-5 rounded '> 
            {results.map((item, idx) => {

                return <h1 key={idx}>
                    <ResultCard item={item}/>
                </h1>
            })}
        </div>
    )
}

export default ResultGrid