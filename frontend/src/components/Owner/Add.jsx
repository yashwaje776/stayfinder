import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/Usercontext";

const Add = () => {
  const { backend_url } = useContext(UserContext);
  const navigate = useNavigate();

  const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null });
  const [inputs, setInputs] = useState({
    city: "",
    title: "",
    description: "",
    location: "",
    pricePerNight: "",
    guest: 1,
    bedroom: 1,
    beds: 1,
    bathroom: 1,
    roomType: "",
    amenities: {
      "Free WiFi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedAmenities = Object.keys(inputs.amenities).filter(
      (key) => inputs.amenities[key]
    );
    const imageFiles = Object.values(images).filter(Boolean);
    if (imageFiles.length === 0)
      return toast.error("Please upload at least one image.");

    const formData = new FormData();
    Object.entries({
      title: inputs.title,
      city: inputs.city,
      description: inputs.description,
      location: inputs.location,
      price: inputs.pricePerNight,
      guest: inputs.guest,
      bedroom: inputs.bedroom,
      beds: inputs.beds,
      bathroom: inputs.bathroom,
      roomType: inputs.roomType,
    }).forEach(([key, value]) => formData.append(key, value));
    formData.append("amenities", JSON.stringify(selectedAmenities));
    imageFiles.forEach((img) => formData.append("images", img));

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${backend_url}/api/rooms/`, formData, {
        headers: { token },
      });

      if (res.data.success) {
        toast.success("Room added successfully!");
        navigate("/host");
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add room");
    }
  };

  return (
    <div className="h-full w-full mt-16 lg:mt-22  overflow-y-auto px-2 sm:px-4 md:px-6 py-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl w-full mx-auto bg-[#EFF1DB] shadow-md rounded-lg p-4 sm:p-6 md:p-8"
      >
        <div className="mb-3 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Add a New Room
          </h1>
          <p className="text-gray-600 text-sm">
            Complete the form below to add your room listing.
          </p>
        </div>

        <section className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Room Images
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.keys(images).map((key) => (
              <label
                htmlFor={`roomImage${key}`}
                key={key}
                className="cursor-pointer group"
              >
                <div className="h-24 w-24 border-2 border-dashed border-gray-300 rounded-md bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src={
                      images[key]
                        ? URL.createObjectURL(images[key])
                        : assets.uploadArea
                    }
                    alt={`Room Image ${key}`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <input
                  id={`roomImage${key}`}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    setImages({ ...images, [key]: e.target.files[0] })
                  }
                />
              </label>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm text-gray-700 mb-1 block">Title</label>
            <input
              required
              placeholder="Enter title"
              className="border p-3 rounded-md w-full bg-white"
              value={inputs.title}
              onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 mb-1 block">Location</label>
            <input
              required
              placeholder="Enter location"
              className="border p-3 rounded-md w-full bg-white"
              value={inputs.location}
              onChange={(e) =>
                setInputs({ ...inputs, location: e.target.value })
              }
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm text-gray-700 mb-1 block">
              Description
            </label>
            <textarea
              placeholder="Room description"
              className="border p-3 rounded-md w-full resize-none bg-white"
              rows="3"
              value={inputs.description}
              onChange={(e) =>
                setInputs({ ...inputs, description: e.target.value })
              }
            />
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-sm text-gray-700 mb-1 block">City</label>
            <input
              placeholder="City"
              className="border p-3 rounded-md w-full bg-white"
              value={inputs.city}
              onChange={(e) => setInputs({ ...inputs, city: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm text-gray-700 mb-1 block">
              Room Type
            </label>
            <select
              required
              className="border p-3 rounded-md w-full bg-white"
              value={inputs.roomType}
              onChange={(e) =>
                setInputs({ ...inputs, roomType: e.target.value })
              }
            >
              <option value="">Select</option>
              <option value="Single Bed">Single Bed</option>
              <option value="Double Bed">Double Bed</option>
              <option value="Luxury Room">Luxury Room</option>
              <option value="Family Suite">Family Suite</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-700 mb-1 block">
              Price / Night
            </label>
            <input
              type="number"
              required
              placeholder="e.g. 100"
              className="border p-3 rounded-md w-full bg-white"
              value={inputs.pricePerNight}
              onChange={(e) =>
                setInputs({ ...inputs, pricePerNight: e.target.value })
              }
            />
          </div>
        </section>

        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          {["guest", "bedroom", "beds", "bathroom"].map((field) => (
            <div key={field}>
              <label className="text-sm capitalize text-gray-700 mb-1 block">
                {field}
              </label>
              <input
                type="number"
                min={1}
                className="border p-3 rounded-md w-full bg-white"
                value={inputs[field]}
                onChange={(e) =>
                  setInputs({ ...inputs, [field]: e.target.value })
                }
              />
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Amenities
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-gray-700 text-sm">
            {Object.keys(inputs.amenities).map((amenity) => (
              <label key={amenity} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-blue-600"
                  checked={inputs.amenities[amenity]}
                  onChange={() =>
                    setInputs({
                      ...inputs,
                      amenities: {
                        ...inputs.amenities,
                        [amenity]: !inputs.amenities[amenity],
                      },
                    })
                  }
                />
                {amenity}
              </label>
            ))}
          </div>
        </section>
         <div className="flex w-full items-center justify-center">
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-md font-medium shadow-md transition-all text-center"
        >
          Add Room
        </button>
      </div>      

        
      </form>
    </div>
  );
};

export default Add;
