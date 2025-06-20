import React, { useContext, useEffect, useState } from 'react'; 
import { roomsDummyData } from '../assets/assets'; 

import { useNavigate } from 'react-router-dom';
import RoomCard from './Roomcard';
import { UserContext } from '../context/Usercontext';

const Featured = () => { 
  const {token,room,setroom}=useContext(UserContext);
  const [roomdata,setRoomdata]=useState([])

  const navigate = useNavigate();
 
  useEffect(() => {
    setRoomdata(room);
  }, [room]);
  return (
    <div className='flex flex-col items-center py-20 px-16'> 
      <div className='flex flex-col items-center justify-center text-center gap-2'> 
        <h1 className='text-4xl font-playfair md-text-[40px]'>Featured Destination</h1> 
        <p className='text-gray-400 max-w-174'>Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences.</p> 
      </div>
      <div className='flex flex-wrap items-center justify-center gap-6 mt-20'> 
        {roomdata.slice(0, 4).map((item, idx) => (
          <div onClick={() => {  navigate(`/rooms/${item._id}`); window.scrollTo(0, 0); } } key={idx} 
            className='relative w-70  rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)] cursor-pointer'>
            <RoomCard image={item.images[0]} name={item.title} price={item.price} address={item.location} />
          </div>
        ))} 
      </div>
      <div className='flex items-center mt-15'> 
        <button onClick={() => navigate('/rooms')} className='px-3 py-3 border border-gray-500 rounded text-sm font-semibold shadow-lg cursor-pointer'>
          View All Destination
        </button> 
      </div> 
    </div>
  ); 
};

export default Featured;
