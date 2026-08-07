import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setQuery } from '../redux/features/searchSlice'


 const SearchBar = () => {

  const [val, setVal] = useState('')

  const dispatch = useDispatch();

 const handleSubmit = (e) => {

  e.preventDefault();

  dispatch(setQuery(val))

  setVal('')
        
 }

  return (
    <div >

      <div className='flex flex-col gap-5 mb-5 justify-between items-center'>

      <h1 className='font-extrabold text-4xl'>
        Discover <span className='text-green-500'> Photos, Videos & GIFs </span>
      </h1>

      <h2>
       Search millions of high-quality media from one place.
      </h2>
    </div>


      <form className='flex bg-[#18181B] gap-5 p-10' onSubmit={handleSubmit} >

          <input 
          required value={val} onChange={(e) => {

            setVal(e.target.value);
            
            
          }} 

          className='w-full p-4 border-2 relative border-white outline-none rounded' type="text" placeholder='Search millions of media...'
          />

          <button 
          className='active:scale-95 cursor-pointer py-2.5 border-0 border-white outline-none rounded absolute right-12 top-58 outline-0 px-5 bg-green-700'>
            Search
          </button>

      </form>
    </div>
  )
}

export default SearchBar