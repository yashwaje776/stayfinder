import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import { UserContext } from '../../context/Usercontext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Dashboard = () => {
  const { token, backend_url } = useContext(UserContext);
  const [dashboardData, setdashboardData] = useState();

  const getbookingData = async () => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/booking/booking-host`,
        {},
        { headers: { token } }
      );
      if (data.success) {
        setdashboardData(data.dashboardData);
      }
    } catch (error) {
      toast.error('Failed to load dashboard data');
    }
  };

  useEffect(() => {
    if (token) getbookingData();
  }, [token]);

  return (
    <div className="h-full w-full overflow-y-auto bg-gray-300 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-6">
          <h1 className="font-playfair text-2xl md:text-3xl lg:text-4xl text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-3xl">
            Monitor your room listings, track bookings, and analyze revenue — all in one place.
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center shadow-sm">
            <img
              src={assets.totalBookingIcon}
              alt="Total Booking"
              className="h-10 hidden sm:block"
            />
            <div className="ml-4">
              <p className="text-blue-600 text-base font-semibold">Total Bookings</p>
              <p className="text-gray-800 text-xl font-bold mt-1">
                {dashboardData?.totalBookings || 0}
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center shadow-sm">
            <img
              src={assets.totalRevenueIcon}
              alt="Total Revenue"
              className="h-10 hidden sm:block"
            />
            <div className="ml-4">
              <p className="text-blue-600 text-base font-semibold">Total Revenue</p>
              <p className="text-gray-800 text-xl font-bold mt-1">
                Rs. {dashboardData?.totalRevenue?.toFixed(2) || '0.00'}
              </p>
            </div>
          </div>
        </div>

        
        <h2 className="text-lg sm:text-xl text-blue-950/80 font-semibold mb-4">Recent Bookings</h2>
        <div className="w-full overflow-x-auto border border-gray-200 rounded-lg max-h-[360px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4 text-gray-800 font-semibold">User Name</th>
                <th className="py-3 px-4 text-gray-800 font-semibold hidden sm:table-cell">Room Name</th>
                <th className="py-3 px-4 text-gray-800 font-semibold">Total Amount</th>
                <th className="py-3 px-4 text-gray-800 font-semibold text-center">Payment Status</th>
              </tr>
            </thead>
            <tbody className="bg-[#EFF1DB]">
              {dashboardData?.bookings?.length > 0 ? (
                dashboardData.bookings.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4 border-t border-gray-200 text-gray-700 whitespace-nowrap">
                      {item?.user?.username || 'N/A'}
                    </td>
                    <td className="py-3 px-4 border-t border-gray-200 text-gray-700 hidden sm:table-cell">
                      {item?.room?.title || 'N/A'}
                    </td>
                    <td className="py-3 px-4 border-t border-gray-200 text-gray-700 whitespace-nowrap">
                      Rs. {item?.totalPrice?.toFixed(2) || '0.00'}
                    </td>
                    <td className="py-3 px-4 border-t border-gray-200 text-center">
                      <span
                        className={`py-1 px-3 text-xs font-medium rounded-full ${
                          item?.isPaid
                            ? 'bg-green-300 text-green-700'
                            : 'bg-yellow-300 text-yellow-800'
                        }`}
                      >
                        {item?.isPaid ? 'Completed' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-gray-500">
                    No recent bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
