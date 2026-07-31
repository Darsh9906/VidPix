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
      <form className='flex bg-gray-900 gap-5 p-10' onSubmit={handleSubmit} >

          <input 
          required value={val} onChange={(e) => {

            setVal(e.target.value);
            
            
          }} 

          className='w-full p-2 border-2 border-white outline-none rounded' type="text" placeholder='Enter your name '
          />

          <button 
          className='active:scale-95 cursor-pointer p-2 border-2 border-white outline-none rounded'>
            Search
          </button>

      </form>
    </div>
  )
}

export default SearchBar