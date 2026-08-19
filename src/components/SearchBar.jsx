import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setQuery } from '../redux/features/searchSlice'
import { Search } from 'lucide-react'


const SearchBar = () => {

  const [val, setVal] = useState('')

  const dispatch = useDispatch();

  const handleSubmit = (e) => {

    e.preventDefault();

    dispatch(setQuery(val))

    setVal('')

  }

  return (
    <div className='relative bg-linear-120  py-4 ' >

      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          background: 'radial-gradient(ellipse 640px 360px at 50% 0%, rgba(34,197,94,0.28), transparent 80%)'
        }}
      />

      <div className='flex flex-col gap-3 mb-3 justify-between items-center'>

        <h1 className='font-extrabold text-4xl'>
          Discover <span className='text-green-500'> Photos, Videos & GIFs </span>
        </h1>

        <h2>
          Search millions of high-quality media from one place.
        </h2>


      </div >

      <div className='flex justify-center'>
        <form className='flex items-center relative w-[80%] justify-center gap-5 p-10' onSubmit={handleSubmit} >

          <div className="relative w-[90%] md:w-[70%] lg:w-[60%]">
            <Search
              size={22}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              required value={val} onChange={(e) => {

                setVal(e.target.value);


              }}

              className='w-full p-4 pl-12 pr-28 border border-zinc-700 bg-zinc-900 text-white outline-none rounded-xl focus:border-green-600 focus:ring-2 focus:ring-green-600/20' type="text" placeholder='Search photos, videos & GIFs...'
            />


            <button
              className='px-6 py-3 rounded-md bg-green-600 hover:bg-green-700 text-white cursor-pointer active:scale-95 transition absolute right-2 top-1/2 -translate-y-1/2'>
              Search
            </button>
          </div>
        </form>
      </div>
      <p className='text-center text-sm text-gray-400 font-mono font-medium'>Powered by Unsplash • Pexels • GIPHY</p>
    </div>
  )
}

export default SearchBar