import React, { useContext, useEffect, useState } from "react"
import { assets } from "../assets/assets"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { UserContext } from "../context/Usercontext"
import { FiMenu, FiX } from "react-icons/fi"

const Navbar = () => {
  const { token, settoken, userData, setuserData } = useContext(UserContext)

  const navigate = useNavigate()

  const [istop, setistop] = useState(true)

  const [menuOpen, setmenuOpen] = useState(false)

  const logout = () => {
    localStorage.removeItem("token")
    settoken("")
    navigate("/login")
  }

  useEffect(() => {
    const handleScroll = () => {
      setistop(window.scrollY === 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const location = useLocation()

  const isTransparent = location.pathname === "/" && istop

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-16 lg:px-24 xl:px-32 py-3 md:py-5 flex justify-between items-center
      ${isTransparent ? "bg-transparent text-white" : "bg-gray-100 text-black shadow-md"}`}>

      <Link to="/">
        <img src={assets.stayfinderlogo} alt="StayFinder" className="w-32 sm:w-40 cursor-pointer" />
      </Link>

      <ul className="hidden md:flex gap-8 items-center text-sm font-medium">
        <NavLink to="/" className="flex flex-col items-center">
          <p>HOME</p>
          <hr className={`w-full h-[2px] mt-1 border-1 border-black  ${location.pathname === "/" ? "block" : "hidden"}`} />
        </NavLink>

        <NavLink to="/rooms" className="flex flex-col items-center">
          <p>ROOMS</p>
          <hr className={`w-full h-[2px] mt-1 bg-black  ${location.pathname === "/rooms" ? "block" : "hidden"}`} />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center">
          <p>ABOUT</p>
          <hr className={`w-full h-[2px] mt-1 bg-black ${location.pathname === "/about" ? "block" : "hidden"}`} />
        </NavLink>
      </ul>

      

      <div className="flex items-center gap-4">
        <div>
        {
          userData.role === "host" ? (
            <Link to="/host/dashboard">
              <button className={`${isTransparent ? "bg-white text-black" : "bg-gray-300 text-black"} px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-200 transition`}>
                Dashboard
              </button>
            </Link>
          ) : (
            <Link to={token ? "/add" : "/login"}>
              <button className={`${isTransparent ? "bg-white text-black" : "bg-gray-300 text-black"} px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-200 transition`}>
                Become a Host
              </button>
            </Link>
          )
        }
        </div>
        
       <div className="hidden md:flex items-center gap-4">
        {
          token ? (
            <div className="relative group cursor-pointer">
              <div className="flex gap-2 items-center">
                <img src={userData.image} alt="User" className="w-10 h-10 rounded-full object-cover border border-gray-300" />
                <img src={assets.dropdown} alt="Dropdown" className="w-4" />
              </div>
              <div className="hidden group-hover:flex flex-col absolute right-0  w-48 bg-white text-gray-700 font-medium p-4 rounded-xl shadow-xl space-y-3 z-50">
                <p className="hover:text-black cursor-pointer" onClick={() => navigate("/my-profile")}>My Profile</p>
                <p className="hover:text-black cursor-pointer" onClick={() => navigate("/mybooking")}>My Booking</p>
                <p className="hover:text-black cursor-pointer" onClick={logout}>Logout</p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2.5 rounded-full text-sm sm:px-7"
            >
              Login
            </button>
          )
        }
        </div>
        <div className="md:hidden">
        <button onClick={() => setmenuOpen(!menuOpen)}>
           <FiMenu />
        </button>
      </div>
      </div>
      

      {
        menuOpen && (
          <div className="fixed inset-0 bg-black/80 text-white flex flex-col items-center justify-center z-50 gap-6 text-xl font-semibold">
            <NavLink to="/" onClick={() => setmenuOpen(false)}>Home</NavLink>
            <NavLink to="/rooms" onClick={() => setmenuOpen(false)}>Rooms</NavLink>
            <NavLink to="/about" onClick={() => setmenuOpen(false)}>About</NavLink>
            {
              token ? (
                <>
                  <p onClick={() => { navigate("/my-profile"); setmenuOpen(false) }}>My Profile</p>
                  <p onClick={() => { navigate("/mybooking"); setmenuOpen(false) }}>My Booking</p>
                  <p onClick={() => { logout(); setmenuOpen(false) }}>Logout</p>
                </>
              ) : (
                <button onClick={() => { navigate("/login"); setmenuOpen(false) }} className="bg-white text-black px-6 py-2 rounded-full text-base">Login</button>
              )
            }
            <button onClick={() => setmenuOpen(false)} className="absolute top-5 right-5 text-3xl">×</button>
          </div>
        )
      }
    </div>
  )
}

export default Navbar
