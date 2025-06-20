import React from 'react'
import Navbar from '../../components/Owner/Navbar'
import Sidebar from '../../components/Owner/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex flex-col h-screen'>
        <Navbar></Navbar>
        <div className='flex h-full'>
        <Sidebar></Sidebar>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
        </div>
      
    </div>
  )
}

export default Layout
