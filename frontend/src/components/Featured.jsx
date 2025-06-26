import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/Usercontext'
import RoomCard from './Roomcard'

const Featured = () => {
  const { room } = useContext(UserContext)
  const [roomData, setRoomData] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    setRoomData(room)
  }, [room])

  return (
    <section className="bg-gray-300 py-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-gray-800">
          Featured Destinations
        </h2>

        <p className="mt-3 text-gray-500 text-sm md:text-base">
          Discover our handpicked selection of top-rated properties for your perfect getaway. Premium comfort, unique locations, and unforgettable stays await.
        </p>
      </div>
      
      <div className="grid gap-8 sm:grid-cols-2  xl:grid-cols-4">
        {roomData.slice(0, 4).map((item) => (
          <div
            key={item._id}
            onClick={() => {
              navigate(`/rooms/${item._id}`)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="cursor-pointer transition-transform transform hover:scale-[1.025] hover:shadow-xl rounded-xl bg-white shadow-md"
          >
            <RoomCard
              id={item._id}
              image={item.images[0]}
              name={item.title}
              price={item.price}
              address={item.location}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-14">
        <button
          onClick={() => navigate('/rooms')}
          className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition shadow-md"
        >
          View All Destinations
        </button>
      </div>
      
    </section>
  )
}

export default Featured
