import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <div className='flex items-center justify-between py-5 px-7 bg-zinc-950 text-2xl'>
               <Link to='/' className='font-extrabold text-4xl tracking-wider cursor-pointer' href='/'>Vid<span className='text-green-700'>Pix</span></Link>

                <div className='flex gap-4 text-sm'>
                    <Link className='bg-white text-black py-1.5 px-4 font-medium rounded active:scale-95 hover:bg-green-600 hover:text-white' to='/'>Search</Link>
                    <Link className='bg-green-600 text-white py-1.5 px-4 font-medium rounded active:scale-95 hover:bg-green-700 hover:text-white' to='/collection'>Collection</Link>
                </div>
            </div>
    </div>
  )
}

export default Navbar