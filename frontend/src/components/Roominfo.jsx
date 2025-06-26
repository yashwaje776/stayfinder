import React, { useContext, useEffect, useRef, useState } from "react";
import { roomsDummyData, assets, facilityIcons } from "../assets/assets";
import { UserContext } from "../context/Usercontext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

const Roominfo = ({ id }) => {
  const {
    token,
    room,
    setroom,
    currencysymbol,
    userData,
    backend_url,
    setuserData,
    onuser,
    setonuser,
    roomData,
    setroomdata,
    addAndRemovefavorites,
  } = useContext(UserContext);
  const navigate = useNavigate();
  const [roomdata, setRoomdata] = useState(null);
  const [img, setImage] = useState();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [checkAvailability, setCheckAvailability] = useState(false);
  const [totalprice, setTotalPrice] = useState("");
  const [days, setDays] = useState("");
  const [loading, setLoading] = useState(false);
  const [excDates, setexcDates] = useState([]);
  const [reviews, setreviews] = useState(null);
  const [cnt, setcnt] = useState(0);

  const mobileScrollRef = useRef();

  const handleScroll = () => {
    if (!roomdata?.images || !mobileScrollRef.current) return;
    const scrollLeft = mobileScrollRef.current.scrollLeft;
    const width = mobileScrollRef.current.offsetWidth;
    const index = Math.round(scrollLeft / width);
    if (roomdata.images[index]) {
      setImage(roomdata.images[index]);
    }
  };

  useEffect(() => {
    if (mobileScrollRef.current && img && roomdata?.images?.length) {
      const index = roomdata.images.findIndex((item) => item === img);
      if (index !== -1) {
        mobileScrollRef.current.scrollTo({
          left: mobileScrollRef.current.offsetWidth * index,
          behavior: "smooth",
        });
      }
    }
  }, [img]);

  const getUserJoinInfo = (dateString) => {
    const createdDate = new Date(dateString);
    const now = new Date();
    let months =
      (now.getFullYear() - createdDate.getFullYear()) * 12 +
      (now.getMonth() - createdDate.getMonth());
    if (months < 12) {
      return `${months <= 0 ? months + 1 : months} month${
        months > 1 ? "s" : ""
      } on Stayfinder`;
    } else {
      const years = Math.floor(months / 12);
      return `${years} year${years > 1 ? "s" : ""} on Stayfinder`;
    }
  };

  const get = async () => {
    try {
      const { data } = await axios.post(`${backend_url}/api/rooms/getreview`, {
        roomId: id,
      });
      if (data.success) {
        setreviews(data.reviews);
        setcnt(data.reviews.length);
      }
    } catch (error) {}
  };

  const unavailableDates = async () => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/rooms/unavailable`,
        { roomId: id }
      );
      if (data.success) {
        const dateObjects = data.unavailableDates.map((d) => new Date(d));
        setexcDates(dateObjects);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (room && id) {
      const room1 = room.find((item) => item._id === id);
      setRoomdata(room1);
      setImage(room1?.images?.[0]);
    }
  }, [id, room]);

  useEffect(() => {
    if (room && id) {
      unavailableDates();
      get();
    }
  }, [room, id]);

  const toggleAvailability = async () => {
    if (!checkAvailability && checkIn && checkOut && guests) {
      let diffDays = Math.ceil(
        (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
      );
      if (diffDays <= 0) diffDays = 1;
      try {
        const { data } = await axios.post(`${backend_url}/api/booking/check`, {
          roomId: roomdata._id,
          checkIn,
          checkOut,
        });
        if (data.available) {
          setCheckAvailability(data.available);
          setDays(diffDays);
          setTotalPrice(roomdata.price * diffDays);
        } else {
          toast.error("Please select different dates");
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "An unknown error occurred"
        );
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
          {
            roomId: roomdata._id,
            checkIn,
            checkOut,
            totalPrice: totalprice,
            guest: guests,
          },
          { headers: { token } }
        );
        if (data.success) {
          toast.success(data.message);
          navigate("/mybooking");
          setCheckAvailability(false);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    }
  };

  if (!roomdata) return <div className="text-center mt-24">Loading...</div>;

  return (
    <div className="w-full px-4 sm:px-6 md:px-20 lg:px-32  bg-gray-300   flex flex-col justify-between">
      <div className="w-full  flex justify-between flex-wrap lg:mt-28 mt-24">
        <h1 className="text-3xl md:text-4xl font-playfair w-[90%]">{roomdata.title}</h1>
        <button
          onClick={(e) => {
            e.stopPropagation();
            addAndRemovefavorites(id); 
          }} className="w-[5%]"
        >
          {userData?.favorites?.includes(id) ? (
            <FaHeart className="text-red-500 h-5" />
          ) : (
            <FaRegHeart className="text-gray-400 h-5" />
          )}
        </button>
      </div>
      <div className="flex flex-col lg:flex-row mt-6 gap-6">
        <div className="w-full lg:w-1/2 max-h-[420px] overflow-hidden rounded-xl shadow-lg relative">
          <div className="absolute top-3 right-4 z-10 bg-black/60 text-white text-sm px-2 py-1 rounded-md lg:hidden">
            {roomdata?.images?.findIndex((i) => i === img) + 1} /{" "}
            {roomdata?.images?.length}
          </div>

          <div
            className="flex lg:hidden overflow-x-auto scroll-smooth no-scrollbar h-full rounded-xl snap-x snap-mandatory"
            ref={mobileScrollRef}
            onScroll={handleScroll}
          >
            {roomdata?.images?.map((item, idx) => (
              <img
                key={idx}
                src={item}
                onClick={() => setImage(item)}
                className={`w-full flex-shrink-0 h-[300px] object-cover rounded-xl cursor-pointer snap-center ${
                  img === item ? "border-2 border-yellow-600" : ""
                }`}
                style={{ minWidth: "100%" }}
                alt={`Room ${idx + 1}`}
              />
            ))}
          </div>

          <img
            src={img}
            alt="Main room"
            className="hidden lg:block w-full h-full object-cover rounded-xl max-h-[420px]"
          />
        </div>

        <div className="hidden lg:grid grid-cols-2 gap-4 w-full lg:w-1/2 max-h-[420px]">
          {roomdata?.images?.map((item, idx) => (
            <img
              key={idx}
              src={item}
              onClick={() => setImage(item)}
              className={`h-[200px] w-full rounded-xl shadow-md object-cover cursor-pointer ${
                img === item ? "border-2 border-yellow-600" : ""
              }`}
              alt={`Room ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row justify-between pt-5 gap-10">
         

        <div className="flex flex-col gap-6 w-full lg:w-[65%]">
          <div>
            <p className="text-xl sm:text-2xl font-semibold">
              Entire rental unit in {roomdata.city}, India
            </p>
            <p className="text-gray-700 text-sm sm:text-base">
              {roomdata.guest} guests · {roomdata.bedroom} bedroom ·{" "}
              {roomdata.beds} beds · {roomdata.bathroom} bathroom
            </p>
          </div>

          <div className="bg-[#EFF1DB] border border-gray-300 rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4 shadow-sm">
            <div className="flex flex-col items-center text-gray-800 px-5">
              <p className="text-lg font-semibold">Guests</p>
              <p className="text-lg font-semibold">Favourites</p>
            </div>
            <div className="hidden  md:block flex-1 lg:max-w-[300px] text-gray-800 font-medium  text-center">
              One of the most loved homes on Stay finder, according to guests
            </div>
            <div className="flex flex-col items-center border-r border-gray-500 px-4">
              <span className="text-2xl font-medium">4.8</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="w-3 h-3" />
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center text-sm text-gray-700 px-4">
              <p className="text-xl font-medium">{cnt}</p>
              <p className="font-medium">Reviews</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <img
              src={roomdata.host.image}
              alt="host"
              className="w-10 rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-lg font-semibold">
                Hosted by {roomdata.host.username}
              </p>
              <p className="text-gray-700">Superhost · 8 months hosting</p>
            </div>
          </div>

          <hr className="border-gray-300 w-full" />

          <div className="flex flex-col gap-6">
            {[
              {
                icon: assets.fan,
                title: "Designed for staying cool",
                desc: "Beat the heat with the A/C and ceiling fan.",
              },
              {
                icon: assets.entrance,
                title: "Self check-in",
                desc: "Check yourself in with the keypad.",
              },
              {
                icon: assets.sch,
                title: "Free cancellation before 6 Jul",
                desc: "Get a full refund if you change your mind.",
              },
            ].map((item, i) => (
              <div className="flex items-center gap-8" key={i}>
                <img src={item.icon} alt={item.title} className="w-8" />
                <div>
                  <p>{item.title}</p>
                  <p className="text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <hr className="border-gray-500 w-full" />

          <p className="w-full">{roomdata.description}</p>

          <hr className="border-gray-500 w-full" />

          <div>
            <p className="text-2xl font-medium">What this place offers</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {roomdata?.amenities?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-50/70"
                >
                  <img
                    src={facilityIcons[item]}
                    alt={item}
                    className="w-6 h-6"
                  />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-500 w-full" />
        </div>

        <div className="block lg:hidden fixed bottom-0 left-0 right-0 w-full bg-[#EFF1DB]  shadow-lg border-t border-gray-500 px-4 py-4  z-30">
          <div className="mb-3 ">
            {checkAvailability ? (
              <p className="text-base font-semibold">
                {currencysymbol}
                {totalprice}
                <span className="text-sm font-normal text-gray-600">
                  {" "}
                  for {days} night{days > 1 ? "s" : ""}
                </span>
              </p>
            ) : (
              <p className="text-center  font-semibold text-gray-900">
                Add dates for prices
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-3 item-center justify-around ">
            <div className="ml-2 flex-1 min-w-[25%] max-w-[30%]">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Check-in
              </label>
              <div className="flex items-center border border-gray-300 rounded px-2 py-1">
                <DatePicker
                  selected={checkIn ? new Date(checkIn) : null}
                  onChange={(date) => {
                    setCheckIn(date);
                    setCheckAvailability(false);
                  }}
                  excludeDates={excDates}
                  minDate={new Date()}
                  placeholderText="Check-in"
                  className="w-full text-sm border-none outline-none"
                />
                <FaCalendarAlt className="text-gray-500 ml-1" />
              </div>
            </div>

           
            <div className="flex-1 min-w-[25%] max-w-[30%]">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Check-out
              </label>
              <div className="flex items-center border border-gray-300 rounded px-2 py-1">
                <DatePicker
                  selected={checkOut ? new Date(checkOut) : null}
                  onChange={(date) => {
                    setCheckOut(date);
                    setCheckAvailability(false);
                  }}
                  excludeDates={excDates}
                  minDate={checkIn ? new Date(checkIn) : new Date()}
                  placeholderText="Check-out"
                  className="w-full text-sm border-none outline-none"
                />
                <FaCalendarAlt className="text-gray-500 ml-1" />
              </div>
            </div>

            
            <div className="flex flex-col justify-end min-w-[20%] max-w-[30%]">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Guests
              </label>
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                min={1}
                max={5}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm outline-none"
              />
            </div>
          </div>

        
          <button
            onClick={checkAvailability ? handleBooking : toggleAvailability}
            disabled={!checkIn || !checkOut || guests < 1 || loading}
            className={`w-full py-3 text-sm rounded-lg font-semibold transition ${
              loading || !checkIn || !checkOut || guests < 1
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {loading
              ? "Booking..."
              : checkAvailability
              ? "Reserve"
              : "Check Availability"}
          </button>
        </div>

        
        <div className="hidden lg:block lg:sticky lg:top-30 self-start w-full lg:w-[33%]">
          <div className="border border-gray-300 rounded-xl p-6 shadow-md w-full h-fit bg-[#EFF1DB] z-20">
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
              <div className="flex flex-col sm:flex-row">
                <div className="flex-1 p-3">
                  <label className="block text-sm">Check-in</label>
                  <div className="flex">
                    <DatePicker
                      selected={checkIn ? new Date(checkIn) : null}
                      onChange={(date) => {
                        setCheckIn(date);
                        setCheckAvailability(false);
                      }}
                      excludeDates={excDates}
                      minDate={new Date()}
                      placeholderText="Pick check-in date"
                      className="w-full border-none outline-none cursor-pointer"
                    />
                    <FaCalendarAlt className="text-gray-500 mt-1" />
                  </div>
                </div>
                <div className="flex-1 p-3 border-t sm:border-t-0 sm:border-l border-gray-300">
                  <label className="block text-sm">Check-out</label>
                  <div className="flex">
                    <DatePicker
                      selected={checkOut ? new Date(checkOut) : null}
                      onChange={(date) => {
                        setCheckOut(date);
                        setCheckAvailability(false);
                      }}
                      excludeDates={excDates}
                      minDate={checkIn ? new Date(checkIn) : new Date()}
                      placeholderText="Pick check-out date"
                      className="w-full border-none outline-none cursor-pointer"
                    />
                    <FaCalendarAlt className="text-gray-500 mt-1" />
                  </div>
                </div>
              </div>

              <div className="flex border-t border-gray-300 p-3 mb-2 gap-5">
                <label className="text-sm text-gray-600 mb-1">Guests :</label>
                <input
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  min={1}
                  max={5}
                  className="px-2 outline-none w-16"
                />
              </div>
            </div>

            <button
              onClick={checkAvailability ? handleBooking : toggleAvailability}
              disabled={!checkIn || !checkOut || guests < 1 || loading}
              className={`w-full py-3 mt-4 rounded-lg font-semibold transition ${
                loading || !checkIn || !checkOut || guests < 1
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              {loading
                ? "Booking..."
                : checkAvailability
                ? "Reserve"
                : "Check Availability"}
            </button>
          </div>
        </div>
      </div>

      {cnt!==0 &&<h1 className="border-t text-3xl font-medium">Reviews</h1>}
      <div className="w-full  pt-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {reviews?.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <img
                src={item.user.image}
                alt={item.user.username}
                className="w-12 h-12 rounded-full object-cover border border-gray-300"
              />
              <div className="flex flex-col">
                <p className="font-semibold">{item.user.username}</p>
                <p>{getUserJoinInfo(item.user.createdAt)}</p>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                {[...Array(item.rating)].map((_, i) => (
                  <FaStar key={i} className="w-2.5 h-2.5" />
                ))}
                <p className="text-black ml-2">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </p>
              </div>
              <p className="leading-relaxed">{item.reviewText}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roominfo;
