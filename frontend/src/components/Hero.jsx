import React, { useState } from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const today = new Date().toISOString().split('T')[0];
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ destination, checkIn, checkOut, guests });
  };

  return (
    <div className='min-h-[70vh]'>
      <div className="flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url('./src/assets/heroImage.png')] bg-no-repeat bg-cover bg-center h-screen">
        <p className="bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20">Stay Beyond Expectations</p>
        <h1 className="font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4">
          Discover Your Perfect Gateway Destination
        </h1>
        <p className="max-w-130 mt-2 text-sm md:text-base">
          Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Start your journey today.
        </p>
        <form onSubmit={handleSubmit} className="bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto">
          <div>
            <div className="flex items-center gap-2">
              <img src={assets.sch} alt="Destination" className="h-4" />
              <label htmlFor="destinationInput">Destination</label>
            </div>
            <input list="destinations" id="destinationInput" className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" value={destination} onChange={(e) => setDestination(e.target.value)} required />
            <datalist id="destinations">
              <option value="pune" />
              <option value="mumbai" />
              <option value="hyderabad" />
              <option value="bangalore" />
            </datalist>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <img src={assets.sch} alt="Check In" className="h-4" />
              <label htmlFor="checkIn">Check in</label>
            </div>
            <input id="checkIn" type="date" min={today} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" required />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <img src={assets.sch} alt="Check Out" className="h-4" />
              <label htmlFor="checkOut">Check out</label>
            </div>
            <input id="checkOut" type="date" min={checkIn || today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" required />
          </div>
          <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
            <label htmlFor="guests">Guests</label>
            <input type="number" id="guests" min={1} max={10} value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none max-w-16" />
          </div>
          <button type="submit" className="flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1 hover:bg-gray-800 transition">
            <img src={assets.searchIcon} alt="searchIcon" className="h-5" />
            <span>Search</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hero;
