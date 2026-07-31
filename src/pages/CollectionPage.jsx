import React from 'react'
import { useSelector } from 'react-redux'
import CollectionCard from '../components/CollectionCard'

const CollectionPage = () => {

 const collection = useSelector(state => state.collection.items)

  return (
    <div  className='flex justify-start flex-wrap gap-4 overflow-auto px-5 rounded py-10'>
      {collection.map((item,idx)=>{
        return <div key={idx}>
          <CollectionCard item={item} />
        </div>
      })}
    </div>
  )
}

export default CollectionPage