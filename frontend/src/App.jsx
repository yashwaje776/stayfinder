import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Homes from './pages/Homes'
import Login from './pages/Login'

import Rooms from './pages/Rooms'
import About from './pages/About'
import Mybooking from './pages/Mybooking'
import Footerpage from './components/Footerpage'
import Navbar from './components/Navbar'
import Layout from './pages/Owner/Layout'
import Dashboard from './pages/Owner/Dashboard'
import AddRoom from './pages/Owner/AddRoom'
import ListRoom from './pages/Owner/ListRoom'
import { ToastContainer } from 'react-toastify'; 
import MyProfile from './pages/MyProfile'
import Becomehost from './pages/Owner/Becomehost'


const App = () => {
  const location = useLocation();
  const isowenerpath=useLocation().pathname.includes("host")
  
  return (
    <div>
         <ToastContainer/>
      {location.pathname !== "/login" && !isowenerpath &&<Navbar></Navbar>}
      <Routes>
        <Route path='/' element={<Homes></Homes>}></Route>
        <Route path='/rooms' element={<Rooms></Rooms>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/rooms/:id' element={<Rooms></Rooms>}></Route>
        <Route path='/mybooking' element={<Mybooking></Mybooking>}></Route>
        <Route path='/my-profile' element={<MyProfile></MyProfile>}></Route>
        <Route path='/add' element={<Becomehost></Becomehost>}></Route>
        <Route path='/host' element={<Layout></Layout>}>
           <Route path='dashboard' element={<Dashboard></Dashboard>}></Route>
           <Route path='add-room' element={<AddRoom></AddRoom>}></Route>
           <Route path='list-room' element={<ListRoom></ListRoom>}></Route>
        </Route>

      </Routes>
      {location.pathname !== "/login" && !isowenerpath &&<Footerpage></Footerpage>}
    </div>
  )
}

export default App
