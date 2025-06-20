import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/Usercontext";

const Navbar = () => {
  const {token,settoken,backend_url,userData,setuserData}=useContext(UserContext)
  const navigate = useNavigate();
  const [istop, setistop] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    settoken("")
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => {
      setistop(window.scrollY === 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const location = useLocation();

  return (
    <div className={`flex justify-between items-center px-4 md:px-16 lg:px-24 xl:px-32 py-4 md:py-6 fixed top-0 w-full left-0 transition-all duration-500 shadow-md z-50
      ${istop ? 'bg-transparent ' : 'bg-white/90 text-black'} 
      ${location.pathname === '/' && istop ? 'text-white' : 'text-black'}`}>
      
      <Link to="/">
        <img className="w-36 cursor-pointer" src={assets.stayfinderlogo} alt="StayFinder Logo" />
      </Link>

      <ul className="hidden sm:flex gap-7 items-center text-sm">
        <NavLink to="/" className="flex flex-col">
          <p className="font-medium">HOME</p>
          <hr className="w-full border-none h-[1.5px] bg-black m-auto hidden" />
        </NavLink>
        <NavLink to="/rooms" className="flex flex-col">
          <p className="font-medium">ROOMS</p>
          <hr className="w-full border-none h-[1.5px] bg-black m-auto hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col">
          <p className="font-medium">ABOUT</p>
          <hr className="w-full h-[1.5px] bg-black m-auto hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-5">
        {
          userData.role !== "user"?<Link to="/host" className="hidden sm:block">
          <button className="px-4 py-2 rounded-md cursor-pointer font-medium">{ "Dashboard"}</button>
        </Link>:<Link to="/add" className="hidden sm:block">
          <button className="px-4 py-2 rounded-md cursor-pointer font-medium">{"Beacome a Host"}</button>
        </Link>
        }

        {token ? (
          <div className="relative group cursor-pointer">
            <div className="flex gap-2 items-center">
              <img src={userData.image} alt="Profile" className="w-10 h-10 rounded-full" />
              <img src={assets.dropdown} alt="Dropdown" />
            </div>
            <div className="hidden group-hover:flex absolute right-0 bootom-9 w-[200px] flex-col gap-4 bg-gray-100 text-gray-600 font-medium p-4 rounded-lg shadow-lg z-20">
              <p className="cursor-pointer hover:text-black" onClick={() => navigate('/my-profile')}>My Profile</p>
              <p className="cursor-pointer hover:text-black" onClick={() => navigate('/mybooking')}>My Booking</p>
              <p className="cursor-pointer hover:text-black" onClick={() => logout()}>Logout</p>
            </div>
          </div>
        ) : (
          <button className="bg-[#5f6fff] px-2 sm:px-7 py-3 text-white rounded-full text-sm" onClick={() => {navigate('/login')}}>
            login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
