import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { UserContext } from '../context/Usercontext'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const { backend_url, setonuser, setroomdata } = useContext(UserContext)

  const [destination, setDestination] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)

  const navigate = useNavigate()
  const today = new Date().toISOString().split('T')[0]

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${backend_url}/api/rooms/check`, {
        checkIn,
        checkOut
      })
      if (data.success) {
        setroomdata(data.availableRooms)
        setonuser(true)
        navigate('/rooms')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${assets.bgimg})` }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex flex-col justify-center items-start h-full px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 max-w-[1400px] mx-auto py-12 sm:py-24">
        <p className="bg-white/20 text-xs sm:text-sm px-4  mt-20 rounded-full mb-4 backdrop-blur-sm">
          ✨ Stay Beyond Expectations
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight max-w-2xl">
          Discover Your Perfect Gateway Destination
        </h1>

        <p className="text-xs sm:text-sm md:text-base mt-4 max-w-lg">
          Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Start your journey today.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-[#EFF1DB] text-gray-800 w-full mt-10 rounded-2xl p-4 sm:p-6 shadow-xl grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
        >
          {/* Destination */}
          <div className="flex flex-col col-span-1">
            <label htmlFor="destinationInput" className="text-sm font-medium mb-1">Destination</label>
            <input
              id="destinationInput"
              list="destinations"
              placeholder="Search city"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <datalist id="destinations">
              <option value="pune" />
              <option value="mumbai" />
              <option value="hyderabad" />
              <option value="bangalore" />
            </datalist>
          </div>

          {/* Check In */}
          <div className="flex flex-col">
            <label htmlFor="checkIn" className="text-sm font-medium mb-1">Check In</label>
            <input
              id="checkIn"
              type="date"
              min={today}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
              className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          {/* Check Out */}
          <div className="flex flex-col">
            <label htmlFor="checkOut" className="text-sm font-medium mb-1">Check Out</label>
            <input
              id="checkOut"
              type="date"
              min={checkIn || today}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
              className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          {/* Guests */}
          <div className="flex flex-col">
            <label htmlFor="guests" className="text-sm font-medium mb-1">Guests</label>
            <input
              id="guests"
              type="number"
              min={1}
              max={10}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md text-sm font-semibold transition flex items-center justify-center gap-2"
            >
              <img src={assets.searchIcon} alt="search" className="h-4" />
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Hero
