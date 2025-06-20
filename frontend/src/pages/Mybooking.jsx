import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { assets, userBookingsDummyData } from '../assets/assets';
import { UserContext } from '../context/Usercontext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Mybooking = () => {
  const {
    token,
    settoken,
    backend_url,
    userData,
    setuserData,
    room,
    setroom,
    currencysymbol,getAllRoom,getRoom
  }=useContext(UserContext)

  const getbookingData=async()=>{
    try{
      const {data}=await axios.post(`${backend_url}/api/booking/booking-user`,{},{ headers: { token } })
      if(data.success){
        setBookings(data.booking)
      }
    }
    catch(error){
        toast.error("error")
    }
  }
  const [bookings, setBookings] = useState(null);
  useEffect(()=>{
    getbookingData();
  },[token])

  return (
    <div className="min-h-[70vh] bg-gray-50 py-16 px-6 md:px-20 mt-24">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-10">
          <h1 className="font-playfair text-4xl text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600 text-base max-w-3xl">
            Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trip seamlessly with just a few clicks.
          </p>
        </div>

       
        <div className="max-w-6xl bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
         
          <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] border-b border-gray-200 bg-gray-100 font-medium text-gray-700 text-sm uppercase tracking-wide py-4 px-6">
            <div>Hotel</div>
            <div className="text-center">Date & Timing</div>
            <div className="text-center">Payment</div>
          </div>

         
          {bookings?.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] border-b border-gray-200 py-6 px-6 items-center hover:bg-gray-50 transition-colors"
            >
              
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <img
                  src={item.room.images[0]}
                  alt={`${item.title} - ${item.room.roomType}`}
                  className="w-full max-w-[180px] h-36 rounded-lg object-cover shadow"
                />
                <div className="flex flex-col gap-1.5">
                  <p className="font-playfair text-2xl text-gray-900">
                    {item.room.title}{' '}
                    <span className="font-inter text-sm text-gray-600">({item.room.roomType})</span>
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <img src={assets.locationIcon} alt="Location" className="w-4 h-4" />
                    <span>{item.room.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <img src={assets.guestsIcon} alt="Guests" className="w-4 h-4" />
                    <span>Guest: {item.guest}</span>
                  </div>
                  <p className="text-gray-800 font-semibold mt-1">Total: {currencysymbol } {item.totalPrice.toFixed(2)}</p>
                </div>
              </div>

             
              <div className="flex justify-start md:justify-center gap-6 mt-4 md:mt-0 text-gray-700 text-sm">
                <div>
                  <p className="font-medium">Check-In:</p>
                  <p className="text-gray-500">{new Date(item.checkIn).toDateString()}</p>
                </div>
                <div>
                  <p className="font-medium">Check-Out:</p>
                  <p className="text-gray-500">{new Date(item.checkOut).toDateString()}</p>
                </div>
              </div>

              
              <div className="flex flex-col items-start md:items-center justify-center gap-3 mt-4 md:mt-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3.5 h-3.5 rounded-full ${item.isPaid ? 'bg-green-500' : 'bg-red-500'}`}
                    aria-label={item.isPaid ? 'Paid' : 'Unpaid'}
                  ></span>
                  <span className={`text-sm font-semibold ${item.isPaid ? 'text-green-600' : 'text-red-600'}`}>
                    {item.isPaid ? 'Paid' : 'Unpaid'}
                  </span>
                </div>
                {!item.isPaid && (
                  <button
                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                   
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mybooking;
