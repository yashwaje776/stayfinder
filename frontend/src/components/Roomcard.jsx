import React, { useContext } from "react"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { assets } from "../assets/assets"
import { UserContext } from "../context/Usercontext"

const RoomCard = ({ id, image, price, name, address }) => {
  const {
    userData,
    currencysymbol,
    addAndRemovefavorites,
  } = useContext(UserContext)

  const isFavorite = userData?.favorites?.includes(id)

  return (
    <div className="bg-[#EFF1DB] rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer flex flex-col">
      
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />

        <p className="absolute top-3 left-3 bg-white/90 text-gray-800 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
          Popular Choice
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation()
            addAndRemovefavorites(id)
          }}
          className="absolute top-3 right-3 text-xl text-white drop-shadow-md"
          aria-label="Toggle Favorite"
        >
          {isFavorite ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-white" />
          )}
        </button>
      </div>

      <div className="p-4 flex flex-col gap-3">
        
        <div className="flex justify-between items-start">
          <p className="text-base md:text-lg font-playfair font-semibold text-gray-800 truncate max-w-[200px]">
            {name}
          </p>

          <div className="flex items-center gap-1 text-sm text-yellow-500">
            <img src={assets.starIconFilled} alt="Rating Star" className="w-4 h-4" />
            <span className="text-gray-700">4.8</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 truncate">
          <img src={assets.locationIcon} alt="Location" className="w-4 h-4" />
          <span>{address}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-gray-800">
            <span className="text-lg font-semibold">
              {currencysymbol}{price}
            </span>
            <span className="text-sm text-gray-500"> /night</span>
          </div>

          <button
            onClick={(e) => e.stopPropagation()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
          >
            Book Now
          </button>
        </div>

      </div>
    </div>
  )
}

export default RoomCard
