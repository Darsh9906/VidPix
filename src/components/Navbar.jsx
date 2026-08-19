import { Bookmark, Search } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <div className='flex items-center justify-between py-5 px-7 border-b-2 border-[#212121] bg-zinc-950 text-2xl'>
               <Link to='/' className='font-extrabold text-4xl tracking-wider cursor-pointer' href='/'>Vid<span className='text-green-700'>Pix</span></Link>

                <div className='flex gap-4 text-sm'>
                    <Link className='flex justify-center gap-3 items-center border border-gray-500 text-gray-300 py-1.5 px-3 font-normal rounded-md active:scale-95 hover:border-gray-100 hover:text-gray-200' to='/'><Search size={16} />  Search</Link>
                    <Link className='flex justify-center gap-2 items-center border text-green-300 border-green-300 py-1.5 px-3 font-normal rounded-md active:scale-95 hover:border-green-600 hover:bg-green-500/10 ' to='/collection'><Bookmark size={16} color='lightgreen'/>  Collection</Link>
                </div>
            </div>
    </div>
  )
}

export default Navbar