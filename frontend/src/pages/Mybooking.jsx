import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { UserContext } from '../context/Usercontext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Mybooking = () => {
  const { token, backend_url, currencysymbol } = useContext(UserContext);

  const [bookings, setBookings] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [showreview, setshowreview] = useState(null);
  const [review, setreview] = useState([]);

  const getreview = async () => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/booking/getBookingReview`,
        {},
        { headers: { token } }
      );
      if (data.success) {
        setreview(data.reviews);
      }
    } catch (error) {
      toast.error('Failed to fetch reviews.');
    }
  };

  const getbookingData = async () => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/booking/booking-user`,
        {},
        { headers: { token } }
      );
      if (data.success) {
        setBookings(data.booking);
      }
    } catch (error) {
      toast.error('Failed to fetch bookings.');
    }
  };

  const giveReview = async (bookingId, roomId) => {
    if (!rating || !reviewText) {
      return toast.error('Please enter both rating and review.');
    }

    try {
      const { data } = await axios.post(
        `${backend_url}/api/booking/review`,
        { roomId, bookingId, rating, reviewText },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        setShowReviewForm(null);
        setRating(5);
        setReviewText('');
        await getbookingData();
        await getreview();
      }
    } catch (error) {
      toast.error('Failed to submit review.');
    }
  };

  useEffect(() => {
    if (token) {
      getbookingData();
      getreview();
    }
  }, [token]);

  const getReviewForBooking = (bookingId) => {
    return review.find((r) => r.booking === bookingId);
  };

  return (
    <div className="min-h-[70vh] bg-gray-300 py-16 px-4 md:px-20">
      <div className="max-w-7xl mx-auto mt-10 sm:mt-20">
        <div className="mb-10">
          <h1 className="font-playfair text-3xl md:text-4xl text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600 text-base max-w-3xl">
            Easily manage your past, current, and upcoming hotel reservations in one place.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="hidden md:grid md:grid-cols-[3fr_2fr_2fr] border-b border-gray-200 bg-gray-100 font-medium text-gray-700 text-sm uppercase tracking-wide py-4 px-6">
            <div>Room</div>
            <div className="text-center">Date & Timing</div>
            <div className="text-center">Payment & Review</div>
          </div>

          {bookings?.map((item) => (
            <div key={item._id} className="border-b border-gray-300 py-6 px-4 md:px-6 hover:bg-gray-50 transition-colors">
              <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr_2fr] gap-6 items-start">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <img
                    src={item.room.images[0]}
                    alt={item.room.title}
                    className="hidden md:block w-full sm:max-w-[120px] lg:max-w-[180px] h-36 rounded-lg object-cover shadow"
                  />
                  <div className="flex flex-col gap-1.5">
                    <p className="font-playfair text-xl  lg:text-2xl text-gray-900">
                      {item.room.title}{' '}
                      <span className="text-sm text-gray-600">({item.room.roomType})</span>
                    </p>
                    <div className='flex md:flex-col gap-4 md:gap-2'>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <img src={assets.locationIcon} alt="Location" className="w-4 h-4" />
                      <span>{item.room.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <img src={assets.guestsIcon} alt="Guests" className="w-4 h-4" />
                      <span>Guest: {item.guest}</span>
                    </div>
                    </div>
                    <p className="text-gray-800 font-semibold mt-1">
                      Total: {currencysymbol} {item.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-start md:justify-center gap-6 text-gray-700 text-sm">
                  <div>
                    <p className="font-medium">Check-In:</p>
                    <p className="text-gray-500">{new Date(item.checkIn).toDateString()}</p>
                  </div>
                  <div>
                    <p className="font-medium">Check-Out:</p>
                    <p className="text-gray-500">{new Date(item.checkOut).toDateString()}</p>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-center justify-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-3.5 h-3.5 rounded-full ${item.isPaid ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className={`text-sm font-semibold ${item.isPaid ? 'text-green-600' : 'text-red-600'}`}>
                      {item.isPaid ? 'Paid' : 'Unpaid'}
                    </span>
                      

                  </div>
                      {item.isPaid===false &&<button className='bg-blue-500 rounded-xl p-1 border  text-white'>Pay now</button>}

                  {item.hasReviewed ? (
                    <>
                      <button
                        onClick={() => setshowreview(showreview === item._id ? null : item._id)}
                        className="text-sm text-gray-500 italic"
                      >
                        {showreview === item._id ? 'Hide Review' : 'Show Your Review'}
                      </button>

                      {showreview === item._id && (() => {
                        const bookingReview = getReviewForBooking(item._id);
                        return bookingReview ? (
                          <div className="mt-2 p-3 bg-gray-100 rounded text-gray-700 text-sm">
                            <p><strong>Rating:</strong> {bookingReview.rating} / 5</p>
                            <p><strong>Review:</strong> {bookingReview.reviewText}</p>
                          </div>
                        ) : (
                          <p className="mt-2 text-gray-500 italic">Review data not found.</p>
                        );
                      })()}
                    </>
                  ) : (
                    <button
                      onClick={() => setShowReviewForm(showReviewForm === item._id ? null : item._id)}
                      className="text-sm text-blue-600 underline hover:text-blue-800"
                    >
                      {showReviewForm === item._id ? 'Cancel' : 'Give Review'}
                    </button>
                  )}
                </div>
              </div>

              {showReviewForm === item._id && !item.hasReviewed && (
                <div className="mt-4 px-2 md:px-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1–5):</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full md:w-24 border px-2 py-1 rounded-md mb-2"
                  />

                  <label className="block text-sm font-medium text-gray-700 mb-1">Review:</label>
                  <textarea
                    rows="3"
                    className="w-full border px-3 py-2 rounded-md mb-3"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Write your experience..."
                  />

                  <button
                    onClick={() => giveReview(item._id, item.room._id)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer"
                  >
                    Submit Review
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mybooking;
