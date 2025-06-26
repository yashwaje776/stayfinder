import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { UserContext } from '../../context/Usercontext';

const Navbar = () => {
  const { userData } = useContext(UserContext);

  return (
    <div className="h-16 w-full bg-gray-200 flex items-center justify-between px-4 py-4 md:px-8 border-b border-gray-300 shadow-sm z-50">
      <Link to="/" className="hover:opacity-80 transition duration-200">
        <img src={assets.stayfinderlogo} alt="StayFinder Logo" className="h-10" />
      </Link>
    </div>
  );
};

export default Navbar;
