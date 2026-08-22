import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  fetchRandomGif,
  fetchRandomPhotos,
  fetchRandomVideos
} from '../api/mediaApi'

import {
  setHomeData,
  setLoading
} from '../redux/features/homeSlice'

import ErrorState from './ErrorState'
import ResultCard from './ResultCard'
import MediaSkeleton from './MediaSkeleton'

const ExploreFeed = () => {
  const dispatch = useDispatch()

  const {
    photos,
    videos,
    gifs,
    loading,
    error
  } = useSelector((state) => state.home)

  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const formatPhotos = (data) => {
    return data.map((item) => ({
      id: item.id,
      type: 'photo',
      title: item.alt_description || 'Photo',
      thumbnail: item.urls.thumb,
      src: item.urls.full,
      url: item.links.html
    }))
  }

  const formatVideos = (data) => {
    return data.videos
      .filter((item) => item.video_files?.length)
      .map((item) => ({
        id: item.id,
        type: 'video',
        title: item.user?.name || 'Video',
        thumbnail: item.image,
        src: item.video_files[0].link,
        url: item.url
      }))
  }

  const formatGifs = (data) => {
    return data.data.map((item) => ({
      id: item.id,
      type: 'gif',
      title: item.title || 'GIF',
      thumbnail: item.images?.downsized?.url,
      src:
        item.images?.original?.url ||
        item.images?.downsized?.url,
      url: item.url
    }))
  }

  const fetchInitialData = async () => {
    try {
      dispatch(setLoading())

      const [photoData, videoData, gifData] =
        await Promise.all([
          fetchRandomPhotos(1),
          fetchRandomVideos(1),
          fetchRandomGif(1)
        ])

      const photos = formatPhotos(photoData)
      const videos = formatVideos(videoData)
      const gifs = formatGifs(gifData)

      dispatch(
        setHomeData({
          photos,
          videos,
          gifs
        })
      )

      setPage(1)
      setHasMore(true)
    } catch (error) {
      console.error('Failed to fetch Explore data:', error)
    }
  }

  useEffect(() => {
    fetchInitialData()
  }, [])

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return

    try {
      setLoadingMore(true)

      const nextPage = page + 1

      const [
        photoData,
        videoData,
        gifData
      ] = await Promise.all([
        fetchRandomPhotos(nextPage),
        fetchRandomVideos(nextPage),
        fetchRandomGif(nextPage)
      ])

      const newPhotos = formatPhotos(photoData)
      const newVideos = formatVideos(videoData)
      const newGifs = formatGifs(gifData)

      if (
        !newPhotos.length &&
        !newVideos.length &&
        !newGifs.length
      ) {
        setHasMore(false)
        return
      }

      dispatch(
        setHomeData({
          photos: [...photos, ...newPhotos],
          videos: [...videos, ...newVideos],
          gifs: [...gifs, ...newGifs]
        })
      )

      setPage(nextPage)
    } catch (error) {
      console.error('Failed to load more media:', error)
    } finally {
      setLoadingMore(false)
    }
  }

  const media = [
    ...photos,
    ...videos,
    ...gifs
  ]

  if (loading) {
    return (
      <main className="px-5 py-8 sm:px-6 lg:px-8">

        <div className="mb-6">
          <div className="h-8 w-48 animate-pulse rounded bg-zinc-800" />
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <MediaSkeleton
              key={index}
              height={220 + (index % 3) * 80}
            />
          ))}
        </div>

      </main>
    )
  }

  if (error) {
    return <ErrorState />
  }

  return (
    <main className="px-5 py-8 sm:px-6 lg:px-8">

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          🔥 Trending Now
        </h1>

      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5">
        {media.map((item) => (
          <ResultCard
            key={`${item.type}-${item.id}`}
            item={item}
          />
        ))}
      </div>

      {loadingMore && (
        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <MediaSkeleton
              key={index}
              height={220 + (index % 3) * 80}
            />
          ))}
        </div>
      )}

      {!loadingMore && hasMore && (
        <div className="flex justify-center py-10">

          <button
            onClick={handleLoadMore}
            className="
              rounded-xl
              bg-green-600
              px-7
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-green-500
              active:scale-95
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Load More
          </button>

        </div>
      )}

      {!hasMore && (
        <p className="py-10 text-center text-sm text-zinc-500">
          You've reached the end.
        </p>
      )}

    </main>
  )
}

export default ExploreFeed