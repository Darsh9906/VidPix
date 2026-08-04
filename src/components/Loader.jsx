import { Loader } from 'lucide-react'
import React from 'react'

const loader = () => {
  return (
    <div>
            <Loader className='h-8 w-8 animate-spin text-white'/>
    </div>
  )
}

export default loader