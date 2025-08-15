import React from 'react'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
    const {user, logout} =useAuth();
  return (
    <div className='flex items-center text-white justify-between h-12 bg-teal-500 px-5'>
      <p className='font-dancing text-2xl'>Welcome {user.name}</p>

           <div className='absolute left-1/2 transform -translate-x-1/2 '>
        <img src="/images/logo1.png" alt="Logo" className="h-14" />
      </div>


      {/* ADD */}
      <button className='px-4 py-1 bg-teal-700 hover:bg-teal-800'onClick={logout}>Logout</button>
    </div>
  )
}

export default Navbar
