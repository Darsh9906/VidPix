import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <div className='flex items-center justify-between py-5 px-7 bg-blue-950 text-2xl'>
               <Link to='/' className='font-extrabold text-2xl tracking-wider cursor-pointer' href='/'>VidPix</Link>

                <div className='flex gap-4 text-sm'>
                    <Link className='bg-white text-black py-1.5 px-4 font-medium rounded active:scale-95' to='/'>Search</Link>
                    <Link className='bg-white text-black py-1.5 px-4 font-medium rounded active:scale-95' to='/collection'>Collection</Link>
                </div>
            </div>
    </div>
  )
}

export default Navbar