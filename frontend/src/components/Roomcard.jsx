import React, { useState } from "react";
import { assets } from "../assets/assets";

const RoomCard = ({ image, price, name, address }) => {
  const [currencySymbol] = useState("₹");

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <div className="relative w-full h-50 overflow-hidden">
        <img src={image} alt={name} className="w-full h-50 object-cover" />
        <span className="absolute top-3 left-3 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          Popular Choice
        </span>
      </div>

      <div className="p-4 flex flex-col justify-between h-full gap-3">
        <div className="flex justify-between items-start">
          <p className="font-playfair text-lg font-semibold text-gray-900 truncate max-w-[200px]">{name}</p>
          <div className="flex items-center gap-1 text-sm text-yellow-500">
            <img src={assets.starIconFilled} alt="star" className="w-4 h-4" />
            <span className="text-gray-700">4.8</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
          <span>{address}</span>
        </div>

        <div className="flex justify-between items-center ">
          <p className="text-lg font-medium text-gray-900">
            {currencySymbol}{price}
            <span className="text-sm text-gray-500">/per Night</span>
          </p>
          <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-500 transition cursor-pointer">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
