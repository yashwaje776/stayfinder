import React, { useContext, useEffect, useState } from "react";
import { roomsDummyData, assets, facilityIcons } from "../assets/assets";
import { UserContext } from "../context/Usercontext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Roominfo = ({ id }) => {
  const { token, room, setroom, currencysymbol, backend_url } = useContext(UserContext);
  const navigate=useNavigate();
  const today = new Date().toISOString().split("T")[0];  // Correctly formatted today date

  const [roomdata, setRoomdata] = useState(null);
  const [img, setImage] = useState();
  const [checkIn, setCheckIn] = useState("");  // Default empty
  const [checkOut, setCheckOut] = useState("");  // Default empty
  const [guests, setGuests] = useState(1); // Default guests = 1
  const [checkAvailability, setCheckAvailability] = useState(false);
  const [totalprice, setTotalPrice] = useState("");
  const [days, setDays] = useState("");
  const [loading, setLoading] = useState(false); // For loading state when booking

  useEffect(() => {
    if (room && id) {
      const room1 = room.find((item) => item._id === id);
      setRoomdata(room1);
      setImage(room1?.images?.[0]);
    }
  }, [id, room]);

  const toggleAvailability = async () => {
    if (!checkAvailability && checkIn && checkOut && guests) {
      const diffTime = new Date(checkOut) - new Date(checkIn);
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays <= 0) diffDays = 1;  
      try {
        const { data } = await axios.post(`${backend_url}/api/booking/check`, {
          roomId: roomdata._id,
          checkIn,
          checkOut
        });
        console.log(data)
        if (data.available) {
          setCheckAvailability(data.available);
          setDays(diffDays);
          setTotalPrice(roomdata.price * diffDays);
          console.log(checkAvailability)
        }
        else{
          toast.error("please selete diffent dates")
        }
      } catch (error) {
        const errorMessage = error?.response?.data?.message || error.message || "An unknown error occurred";
        toast.error(errorMessage);
      }      
    } else if (checkAvailability) {
      setCheckAvailability(false);
      setTotalPrice("");
      setDays("");
    }
  };

  const handleBooking = async () => {
    if (!token) {
      toast.error("You need to log in to book this room.");
      return;
    }

    if (checkAvailability) {
      setLoading(true);
      try {
        const { data } = await axios.post(
          `${backend_url}/api/booking/book`,
          { roomId: roomdata._id, checkIn, checkOut, totalPrice: totalprice, guest: guests },
          { headers: { token } }
        );

        if (data.success) {
          toast.success(data.message);
          navigate('/mybooking')
          setCheckAvailability(false);
        }
      } catch (error) {
        const errorMessage = error?.response?.data?.message || error.message || "An unknown error occurred";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!roomdata) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="w-full px-4 md:px-20 lg:px-32 mt-28 bg-white flex flex-col justify-between">
      <div className="w-full flex">
        <h1 className="text-4xl font-playfair items-start">{roomdata.title}</h1>
      </div>

      <div className="flex flex-col lg:flex-row mt-6 gap-6">
        <div className="lg:w-1/2 w-full max-h-[420px] overflow-hidden rounded-xl shadow-lg">
          <img
            src={img}
            alt="Main room"
            className="w-full h-full object-cover rounded-xl"
            style={{ maxHeight: '420px' }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 w-1/2 max-h-[400px]">
          {roomdata?.images?.map((item, idx) => (
            <img
              key={idx}
              src={item}
              alt={`Room Image ${idx + 1}`}
              onClick={() => setImage(item)}
              className={`h-[200px] w-full rounded-xl shadow-md object-cover cursor-pointer ${img === item ? "border-2 border-yellow-600" : ""}`}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex justify-between pt-5">
       
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-2xl font-semibold">Entire rental unit in {roomdata.city}, India</p>
            <p className="text-gray-700">
              {roomdata.guest} guests · {roomdata.bedroom} bedroom · {roomdata.beds} beds · {roomdata.bathroom} bathroom
            </p>
          </div>

          <div className="flex gap-2 items-center border p-4 rounded">
            <div className="text-xl font-playfair font-semibold flex flex-col">
              <p>Guests</p>
              <p>Favourite</p>
            </div>
            <p className="max-w-75 font-medium ml-4">
              One of the most loved homes on Stayfinder, according to guests
            </p>
            <p className="flex flex-col border-r p-2">
              4.8{" "}
              <span className="flex">
                {[...Array(5)].map((_, i) => (
                  <img key={i} alt="star" src={assets.starIconFilled} className="w-4.5 h-4.5" />
                ))}
              </span>
            </p>
            <p className="ml-2 font-medium text-gray-600">200+ reviews</p>
          </div>

          <div className="flex items-center gap-4">
            <img
              src={roomdata.host.image}
              alt="host profile"
              className="w-10 rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-lg font-semibold">Hosted by {roomdata.host.username}</p>
              <p className="text-gray-700">Superhost · 8 months hosting</p>
            </div>
          </div>

          <hr className="border-gray-300 w-full" />

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-8">
              <img src={assets.fan} alt="fan icon" className="w-8" />
              <div>
                <p>Designed for staying cool</p>
                <p className="text-gray-500">Beat the heat with the A/C and ceiling fan.</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <img src={assets.entrance} alt="entrance icon" className="w-8" />
              <div>
                <p>Self check-in</p>
                <p className="text-gray-500">Check yourself in with the keypad.</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <img src={assets.sch} alt="cancellation icon" className="w-8" />
              <div>
                <p>Free cancellation before 6 Jul</p>
                <p className="text-gray-500">Get a full refund if you change your mind.</p>
              </div>
            </div>
          </div>

          <hr className="border-gray-300 w-full" />

          <p className="w-187">{roomdata.description}</p>

          <hr className="border-gray-300 w-full" />

          <div>
            <p className="text-2xl font-medium">What this place offers</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {roomdata?.amenities?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-50/70"
                >
                  <img src={facilityIcons[item]} alt={item} className="w-6 h-6" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-300 w-full" />
        </div>

       
        <div className="border border-gray-300 rounded-xl p-6 mt-20 shadow-md max-w-[33%] h-80 sticky top-30 self-start">
          <div className="mb-4">
            {checkAvailability ? (
              <p>
                <span className="text-2xl font-medium">
                  {currencysymbol} {totalprice}
                </span>{" "}
                for {days} night{days > 1 ? "s" : ""}
              </p>
            ) : (
              <p className="text-2xl font-semibold text-gray-900">
                Add dates for prices
              </p>
            )}
          </div>

          <div className="flex flex-col border border-gray-300 rounded-lg overflow-hidden mb-4">
            <div className="flex">
              <div className="flex-1 p-3">
                <label className="block text-sm text-gray-600">Check-in</label>
                <input
                  type="date"
                  value={checkIn}
                  min={today}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full border-none outline-none cursor-pointer"
                />
              </div>
              <div className="flex-1 p-3 border-l border-gray-300">
                <label className="block text-sm text-gray-600" htmlFor="checkout">
                  Checkout
                </label>
                <input
                  type="date"
                  value={checkOut}
                  id="checkout"
                  min={checkIn || today}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full border-none outline-none cursor-pointer"
                />
              </div>
            </div>

            <div className="flex border-t border-gray-300 p-3 mb-2 gap-5">
              <label className="block text-sm text-gray-600 mb-1">Guests :</label>
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                min={1}
                max={5}
                className="px-2 outline-none"
              />
            </div>
          </div>

          <button
            onClick={checkAvailability ? handleBooking : toggleAvailability}
            disabled={!checkIn || !checkOut || guests < 1 || loading}
            className={`w-full py-3 mt-4 rounded-lg font-semibold transition ${loading || !checkIn || !checkOut || guests < 1
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {loading ? "Booking..." : checkAvailability ? "Reserve" : "Check Availability"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Roominfo;
