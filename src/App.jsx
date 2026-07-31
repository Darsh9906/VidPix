import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CollectionPage from './pages/CollectionPage'
import Navbar from './components/Navbar'
import { ToastContainer} from 'react-toastify';


const App = () => {
  return (
    <div className='bg-gray-950 text-white w-full min-h-screen'>

    <Navbar />
       <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/collection' element={<CollectionPage/>} />
       </Routes>


      <ToastContainer />
      
    </div>
  )
}

export default App