import { BookmarkOff } from 'lucide-react';
import React from 'react'
import { useDispatch } from 'react-redux';
import { removeCollection, removeToast } from '../redux/features/collectionSlice';

const CollectionCard = ({item}) => {
    

   const dispatch = useDispatch()

   const removeItem = () => {

    dispatch(removeCollection(item))
    dispatch(removeToast())
   } 

  return (

    
    <div className='relative w-[18vw] h-60 bg-white rounded-md overflow-hidden '>

      
      <a href={item.url} target='_blank' >
        {item.type == 'photo'?<img className=' h-full w-full object-center object-cover' src={item.src} alt="img" />:''}
        {item.type == 'video'? <video className='h-full w-full object-center object-cover' muted loop autoPlay src={item.src}></video>:''}
        {item.type == 'gif'?<img className='h-full w-full object-center object-cover' src={item.thumbnail} alt="img"/>:''}
      </a>

      <button
    onClick={() => removeItem(item)}
    className="
      absolute
      top-3
      right-3
      z-10
      flex
      items-center
      justify-center
      p-2
      rounded-full
      bg-black/60
      backdrop-blur-md
      text-white
      cursor-pointer
      hover:bg-red-500
      hover:scale-110
      active:scale-95
      transition-all
      duration-200
    "
  >
    <BookmarkOff
      size={19}
      strokeWidth={2.5}
    />
  </button>


      <div className='bg-linear-[transparent,black] absolute bottom-0 py-4 px-2 w-full flex justify-between '>
        <h1 className='text-lg w-[80%] font-semibold capitalize h-10'>{item.title}</h1>
        
      </div>

      </div>

  )
}

export default CollectionCard