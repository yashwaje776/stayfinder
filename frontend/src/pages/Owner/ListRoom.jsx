import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/Usercontext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ListRoom = () => {
  const { currencysymbol, backend_url, token ,getAllRoom,getRoom} = useContext(UserContext);
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
    console.log("change")
    try{
        const {data}=await axios.post(`${backend_url}/api/rooms/update`,{roomId},{headers:{token}})
        if(data.success){
          toast.success("Room avilability has been change");
          getRooms();
          getAllRoom();
          getRoom();
        }
    }
    catch(error){
      console.log(error)
    }
    
  };

  useEffect(() => {
  getRooms();
}, [token]);

  if (loading) {
    return <div>Loading rooms...</div>;
  }

  return (
    <div className="px-6 pt-6">
      <div className="mb-10">
        <h1 className="font-playfair text-4xl text-gray-900 mb-2">Room Listings</h1>
        <p className="text-gray-600 text-base max-w-3xl">
          Manage all listed rooms. Update their availability and details for better guest experience.
        </p>
      </div>

      <div className="w-full overflow-x-auto border border-gray-200 rounded-lg max-h-[32rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="py-3 px-5 text-gray-800 font-medium text-sm">Image</th>
              <th className="py-3 px-5 text-gray-800 font-medium text-sm">Name</th>
              <th className="py-3 px-5 text-gray-800 font-medium text-sm max-sm:hidden">Facility</th>
              <th className="py-3 px-5 text-gray-800 font-medium text-sm">Price/Night</th>
              <th className="py-3 px-5 text-gray-800 font-medium text-sm text-center">Available</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rooms?.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="py-3 px-5 border-t border-gray-200">
                  <img
                    src={item.images[0]}
                    alt="Room"
                    className="w-12 h-12 object-cover rounded-md shadow-sm border border-gray-200"
                  />
                </td>
                <td className="py-3 px-5 border-t border-gray-200 text-gray-800 font-medium">
                  {item.roomType}
                </td>
                <td className="py-3 px-5 border-t border-gray-200 text-gray-600 max-sm:hidden">
                  {item.amenities.join(', ')}
                </td>
                <td className="py-3 px-5 border-t border-gray-200 text-gray-700 font-semibold">
                  {currencysymbol}{item.price.toLocaleString()}
                </td>
                <td className="py-3 px-5 border-t border-gray-200 text-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={item.availability}
                      onChange={() => handleToggleAvailability(item._id)}
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
  );
};

export default ListRoom;
