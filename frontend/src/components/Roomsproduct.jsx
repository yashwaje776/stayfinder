import React, { useContext, useEffect, useState } from "react";
import { roomsDummyData, facilityIcons, assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/Usercontext";

const Roomsproduct = () => {
  const { token, room, setroom, currencysymbol } = useContext(UserContext);
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
    let filteredProducts = [...room];

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
  }, [filters, priceRange, selectedSort, room]);

  return (
    <div className="w-full px-4 md:px-10 lg:px-20 py-10 mt-20 bg-white flex flex-col lg:flex-row gap-8">
      
      <div className="w-full lg:w-3/4">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-playfair">
            Hotel Rooms
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-xl">
            Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {products.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                navigate(`/rooms/${item._id}`);
                window.scrollTo(0, 0);
              }}
              className="flex flex-col md:flex-row items-start gap-5 p-5 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={item.images[0]}
                alt={item.roomType}
                className="w-full md:w-1/2 h-60 object-cover rounded-lg"
              />

              <div className="md:w-1/2 flex flex-col gap-2">
                <p className="text-gray-500 text-sm">{item.roomType}</p>
                <h2 className="text-2xl text-gray-800 font-semibold font-playfair">
                  {item.title}
                </h2>

                
                <div className="flex items-center text-sm text-gray-600">
                  {[...Array(5)].map((_, i) => (
                    <img key={i} alt="star" className="w-4 h-4" src={assets.starIconFilled} />
                  ))}
                  <span className="ml-2">200+ reviews</span>
                </div>

                
                <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                  <img alt="location" src={assets.locationIcon} className="w-4 h-4" />
                  <span>{item.location}</span>
                </div>

               
                <div className="flex flex-wrap items-center mt-3 gap-3">
                  {item.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-100 text-xs"
                    >
                      <img src={facilityIcons[amenity]} alt={amenity} className="w-4 h-4" />
                      <p>{amenity}</p>
                    </div>
                  ))}
                </div>

                
                <p className="text-xl font-semibold text-gray-700 mt-3">
                  {currencysymbol}
                  {item.price}
                  <span className="text-sm font-normal ml-1">/night</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <aside className="w-full lg:w-1/4">
        <div className="bg-white border border-gray-200 rounded-lg shadow px-6 py-5 sticky top-24">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
            <button
              className="text-xs text-blue-600 hover:underline"
              onClick={() => {
                setFilters([]);
                setPriceRange([]);
                setSelectedSort(null);
              }}
            >
              Clear
            </button>
          </div>


          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Room Type</p>
            {["Single Bed", "Double Bed", "Luxury Room", "Family Suite"].map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 text-sm text-gray-600 mb-2"
              >
                <input
                  type="checkbox"
                  checked={filters.includes(type)}
                  onChange={() => handleFilterChange(type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>

         
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Price Range</p>
            {priceOptions.map((option) => (
              <label
                key={option.id}
                className="flex items-center gap-2 text-sm text-gray-600 mb-2"
              >
                <input
                  type="checkbox"
                  checked={priceRange.includes(option.id)}
                  onChange={() => handlePriceRangeChange(option.id)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>

         
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Sort By</p>
            <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <input
                type="radio"
                name="sortOption"
                checked={selectedSort === 0}
                onChange={() => handleSortChange(0)}
              />
              Price Low to High
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="radio"
                name="sortOption"
                checked={selectedSort === 1}
                onChange={() => handleSortChange(1)}
              />
              Price High to Low
            </label>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Roomsproduct;
