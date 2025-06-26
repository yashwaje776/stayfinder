import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/Usercontext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ListRoom = () => {
  const { currencysymbol, backend_url, token, getAllRoom, getRoom } = useContext(UserContext);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRooms = async () => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/rooms/owner-room`,
        {},
        { headers: { token } }
      );
      if (data.success) {
        setRooms(data.Room);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAvailability = async (roomId) => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/rooms/update`,
        { roomId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success("Room availability updated");
        getRooms();
        getAllRoom();
        getRoom();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getRooms();
  }, [token]);

  if (loading) return <div className="p-6 text-gray-600">Loading rooms...</div>;

  return (
    <div className="h-full overflow-y-auto bg-gray-300 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto bg-[#EFF1DB] rounded-lg shadow-md p-4 sm:p-6">

        {/* Header */}
        <div className="mb-6">
          <h1 className="font-playfair text-2xl sm:text-3xl font-semibold text-gray-900 mb-1">
            Room Listings
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your listed rooms. You can toggle availability and monitor details.
          </p>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto border border-gray-200 rounded-lg max-h-[32rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
          <table className="min-w-full text-left bg-white text-sm">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4 text-gray-800 font-semibold">Image</th>
                <th className="py-3 px-4 text-gray-800 font-semibold">Name</th>
                <th className="py-3 px-4 text-gray-800 font-semibold hidden sm:table-cell">Facility</th>
                <th className="py-3 px-4 text-gray-800 font-semibold">Price/Night</th>
                <th className="py-3 px-4 text-gray-800 font-semibold text-center">Available</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {rooms?.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 border-t border-gray-200">
                    <img
                      src={item.images[0]}
                      alt="Room"
                      className="w-12 h-12 object-cover rounded-md border border-gray-300"
                    />
                  </td>
                  <td className="py-3 px-4 border-t border-gray-200 text-gray-800 font-medium">
                    {item.roomType}
                  </td>
                  <td className="py-3 px-4 border-t border-gray-200 text-gray-600 hidden sm:table-cell">
                    {item.amenities.join(', ')}
                  </td>
                  <td className="py-3 px-4 border-t border-gray-200 text-gray-700 font-semibold whitespace-nowrap">
                    {currencysymbol}{item.price.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 border-t border-gray-200 text-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={item.availability}
                         onChange={(e) =>{e.stopPropagation(); handleToggleAvailability(item._id) }}
                      />
                      <div className="w-12 h-6 bg-slate-300 rounded-full peer peer-checked:bg-emerald-500 transition-colors duration-300"></div>
                      <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-6 shadow-sm"></div>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default ListRoom;
