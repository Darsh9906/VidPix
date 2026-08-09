import React from 'react'
import { Bookmark } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addCollection, addedToast } from '../redux/features/collectionSlice';

const   ResultCard = ({item}) => {

 const dispatch = useDispatch()

 const addToCollection = (item) => {

  dispatch(addCollection(item))
  dispatch(addedToast())
  
 }

  

  return (
    <div className='relative w-[18vw] h-60 bg-white rounded-md overflow-hidden '>

      <a href={item.url} target='_blank' >
        {item.type == 'photo'?<img className=' h-full w-full object-center object-cover' src={item.src} alt="img" />:''}
        {item.type == 'video'? <video className='h-full w-full object-center object-cover' muted loop autoPlay src={item.src}></video>:''}
        {item.type == 'gif'?<img className='h-full w-full object-center object-cover' src={item.thumbnail} alt="img"/>:''}
      </a>

       <button
    onClick={() => addToCollection(item)}
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
      hover:bg-green-600
      hover:scale-110
      active:scale-95
      transition-all
      duration-200
    "
  >
    <Bookmark
      size={19}
      strokeWidth={2.5}
    />
  </button>


      <div className='bg-linear-[transparent,black] absolute bottom-0 py-4 px-2 w-full flex justify-between'>
        <h1 className='text-lg w-[80%] font-semibold capitalize h-10'>{item.title}</h1> 
        
      </div>

    </div>
  )
}

export default ResultCard