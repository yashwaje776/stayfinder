import React from "react";
import { assets, exclusiveOffers } from "../assets/assets";

const Exclusivepage = () => {
  return (
    <div className="flex flex-col items-center w-full px-4 md:px-16 lg:px-24 xl:px-32 py-10">
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4">
        <div className="flex flex-col w-full items-start">
          <h1 className="text-4xl font-playfair">Exclusive Offers</h1>
          <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-2xl">
            Take advantage of our limited-time offers and special packages to
            enhance your stay and create unforgettable memories.
          </p>
        </div>
        <button className="group flex items-center font-medium gap-2 cursor-pointer mt-4 md:mt-0">
          <p>View All Offers</p>
          <img
            src={assets.arrowIcon}
            alt="arrow"
            className="group-hover:translate-x-1 transition-all w-4 h-4"
          />
        </button>
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full">
        {exclusiveOffers.map((item, idx) => (
          <div key={idx} className="group relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} >
            <p className="px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full">
              {item.priceOff} % OFF
            </p>
            <div>
              <p className="text-2xl font-medium font-playfair">{item.title}</p>
              <p>{item.description}</p>
              <p className="text-xs text-white/70 mt-3"> Expires {item.expiryDate}</p>
            </div>
            <button className="flex items-center gap-2 font-medium cursor-pointer mt-4 mb-5">
                <p>View All Offers</p>
                <img src={assets.arrowIcon} alt="arrow" className="invert group-hover:translate-x-1 transition-all" />
            </button>
          </div>

        ))}
      </div>
      

    </div>
  );
};


export default Exclusivepage;
