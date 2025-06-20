import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { UserContext } from '../../context/Usercontext'

const Navbar = () => {
    const {userData}=useContext(UserContext)
  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300'>
      <Link to='/'>
        <img src={assets.stayfinderlogo} className='h-9'></img>
      </Link>
      <img src={userData.image ||assets.profilei} className='h-9 rounded-full'></img>
    </div>
  )
}

export default Navbar
