import { RefreshCcw } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'


const ErrorState = () => {
  return (
    <div className='flex justify-center py-15 items-center bg-gray-800 rounded-4xl'>

        <div className='flex flex-col justify-center items-center text-center gap-5'>
        
        <h1 className='font-bold text-4xl'><span className='text-red-500'>Oops!</span> Something Went Wrong</h1>
        <h2 className=' px-10 w-[50%] flex-wrap text-gray-400'>Sorry we are having some technical issues (as you can see) try to refresh the page, sometime works :)</h2>

       <a href='/'> <button className='cursor-pointer text-black flex gap-2 rounded-2xl bg-green-700 text-white p-2 '><span>Refresh</span> <RefreshCcw /> </button> </a> 

        </div>

    </div>
  )
}

export default ErrorState