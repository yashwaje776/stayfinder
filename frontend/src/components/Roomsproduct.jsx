import React, { useContext, useEffect, useState } from "react";
import { roomsDummyData, facilityIcons, assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/Usercontext";
import { FaHeart, FaRegHeart, FaBars, FaTimes } from "react-icons/fa";

const Roomsproduct = () => {
  const {
    room,
    roomData,
    Favourite,
    userData,
    currencysymbol,
    addAndRemovefavorites,
    onuser,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const priceOptions = [
    { id: 1, label: "₹1000 to ₹2000", min: 1000, max: 2000 },
    { id: 2, label: "₹2000 to ₹3000", min: 2000, max: 3000 },
    { id: 3, label: "₹3000 to ₹4000", min: 3000, max: 4000 },
    { id: 4, label: "₹4000 to ₹5000", min: 4000, max: 5000 },
  ];

  const [filters, setFilters] = useState([]);
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([]);
  const [selectedSort, setSelectedSort] = useState(null);
  const [fav, setFav] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const handleFilterChange = (filter) => {
    setFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const handlePriceRangeChange = (id) => {
    setPriceRange((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleSortChange = (val) => {
    setSelectedSort((prev) => (prev === val ? null : val));
  };

  useEffect(() => {
    let filteredProducts;
    if (onuser) {
      filteredProducts = [...roomData];
    } else if (fav) {
      filteredProducts = [...Favourite];
    } else {
      filteredProducts = [...room];
    }

    if (filters.length > 0) {
      filteredProducts = filteredProducts.filter((item) =>
        filters.includes(item.roomType)
      );
    }

    if (priceRange.length > 0) {
      const selectedRanges = priceOptions.filter((option) =>
        priceRange.includes(option.id)
      );
      filteredProducts = filteredProducts.filter((item) =>
        selectedRanges.some(
          (range) => item.price >= range.min && item.price <= range.max
        )
      );
    }

    if (selectedSort !== null) {
      filteredProducts.sort((a, b) =>
        selectedSort === 0 ? a.price - b.price : b.price - a.price
      );
    }

    setProducts(filteredProducts);
  }, [filters, priceRange, selectedSort, room, fav, onuser, roomData, Favourite]);

  return (
    <div className="w-full px-4 md:px-10 lg:px-20 py-10 bg-gray-300">
      <div className="lg:hidden flex justify-between items-center mb-4 border border-gray-500 p-3 rounded-xl  mt-20">
        <h2 className="text-xl font-bold text-gray-800">Filters</h2>
        <button onClick={() => setFilterOpen(!filterOpen)} className="text-xl text-gray-800 ">
          {filterOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row-reverse gap-8 items-start relative lg:mt-20">
        <aside
          className={`bg-[#EFF1DB] border border-gray-200 rounded-xl shadow-sm px-6 py-5 w-full lg:w-1/4
            ${filterOpen ? "block" : "hidden"} lg:block lg:sticky lg:top-24`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
            <button
              className="text-xs text-blue-600 hover:underline"
              onClick={() => {
                setFilters([]);
                setPriceRange([]);
                setSelectedSort(null);
                setFav(false);
              }}
            >
              Clear All
            </button>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Room Type</p>
            {["Single Bed", "Double Bed", "Luxury Room", "Family Suite"].map((type) => (
              <label key={type} className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <input
                  type="checkbox"
                  checked={filters.includes(type)}
                  onChange={() => handleFilterChange(type)}
                />
                {type}
              </label>
            ))}
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Price Range</p>
            {priceOptions.map((option) => (
              <label key={option.id} className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <input
                  type="checkbox"
                  checked={priceRange.includes(option.id)}
                  onChange={() => handlePriceRangeChange(option.id)}
                />
                {option.label}
              </label>
            ))}
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-3">Sort By</p>
            <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <input
                type="radio"
                name="sortOption"
                checked={selectedSort === 0}
                onChange={() => handleSortChange(0)}
              />
              Price: Low to High
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="radio"
                name="sortOption"
                checked={selectedSort === 1}
                onChange={() => handleSortChange(1)}
              />
              Price: High to Low
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={fav}
              onChange={() => setFav((prev) => !prev)}
            />
            <span className="text-sm text-gray-700">Show Favourites Only</span>
          </div>
        </aside>

        <div className="w-full lg:w-3/4">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 font-playfair">
              Explore Hotel Rooms
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-xl">
              Find the perfect stay with exclusive offers, premium comfort, and unbeatable prices.
            </p>
          </div>

          <div className="flex flex-col gap-6 ">
            {products.map((item) => (
              <div
                key={item._id}
                onClick={() => {
                  navigate(`/rooms/${item._id}`);
                  window.scrollTo(0, 0);
                }}
                className="cursor-pointer flex flex-col md:flex-row items-start gap-5 p-5 bg-[#EFF1DB] border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition duration-300"
              >
                <img
                  src={item.images[0]}
                  alt={item.roomType}
                  className="w-full md:w-1/2 h-60 object-cover rounded-lg"
                />
                <div className="md:w-1/2 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-sm">{item.roomType}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addAndRemovefavorites(item._id);
                      }}
                    >
                      {userData?.favorites?.includes(item._id) ? (
                        <FaHeart className="text-red-500 text-lg" />
                      ) : (
                        <FaRegHeart className="text-gray-400 text-lg" />
                      )}
                    </button>
                  </div>

                  <h2 className="text-xl sm:text-2xl text-gray-800 font-semibold font-playfair">
                    {item.title}
                  </h2>

                  <div className="flex items-center text-sm text-gray-600">
                    {[...Array(5)].map((_, i) => (
                      <img key={i} alt="star" src={assets.starIconFilled} className="w-4 h-4" />
                    ))}
                    <span className="ml-2 text-gray-500">200+ reviews</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
                    <span>{item.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs"
                      >
                        <img src={facilityIcons[amenity]} alt={amenity} className="w-4 h-4" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-3 text-[18px] font-semibold text-gray-800 flex items-baseline gap-1">
                    {currencysymbol}{item.price}
                    <span className="text-sm font-medium text-gray-600">/night</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roomsproduct;
