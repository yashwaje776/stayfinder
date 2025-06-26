import React, { useState, useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../context/Usercontext";

const MyProfile = () => {
  const { token, userData, backend_url } = useContext(UserContext);
  
  const [isedit, setisedit] = useState(false);
  const [Image, setImage] = useState(null);
  const [userdata, setuserdata] = useState({
    name: "",
    email: "",
    image: assets.profilei,
    contact: "+910000000000",
  });

  useEffect(() => {
    if (token && userData) {
      setuserdata({
        name: userData.username,
        email: userData.email,
        image: userData.image,
        contact: userData.contact,
      });
    }
  }, [token, userData]);

  const UpdateUserData = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", userData._id);
      formData.append("username", userdata.name);
      formData.append("contact", userdata.contact);
      if (Image) {
        formData.append("file", Image);
      }
      
      const response = await axios.post(
        `${backend_url}/api/user/UpdateuserProfile`,
        formData,
        {
          headers: {
            token
          },
        }
      );

      if (response.data.success) {
        const updated = response.data.user;
        toast.success("Profile updated!",{
           position: "top-center", 
        });

        setuserdata({
          name: updated.username,
          email: updated.email,
          contact: updated.contact,
          image: updated.image,
        });
        setisedit(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err)
      
      toast.error("Error updating profile");
    }
  };

  return userData &&(
  <div className="min-h-screen bg-gray-300 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-[#EFF1DB] mb-10 p-8 mt-28 rounded-3xl shadow-xl flex flex-col items-center gap-8">
      {isedit ? (
        <label htmlFor="image" className="relative w-44 h-44 rounded-full overflow-hidden cursor-pointer group border-4 border-blue-500">
          <img
            className="w-full h-full object-cover"
            src={Image ? URL.createObjectURL(Image) : userdata.image}
            alt="Profile"
          />
          <div className="absolute inset-0 bg-blue-600 bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full text-white font-semibold text-lg transition-opacity duration-300">
            Change Photo
          </div>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            accept="image/*"
          />
        </label>
      ) : (
        <img
          className="w-44 h-44 object-cover rounded-full border-4 border-gray-200 shadow-md"
          src={userdata.image}
          alt="Profile"
        />
      )}

      <div className="w-full">
        {isedit ? (
          <input
            className="w-full text-center text-3xl font-bold text-gray-900 py-3 border-b-4 border-blue-500 focus:outline-none"
            type="text"
            placeholder="Enter your full name"
            value={userdata.name}
            onChange={(e) =>
              setuserdata((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            {userdata.name}
          </h1>
        )}
      </div>

      <hr className="w-full border-gray-300" />

      <div className="w-full text-gray-700">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Contact Information
        </p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-3 text-sm items-center">
          <p className="font-semibold text-gray-700">Email:</p>
          <p className="text-blue-600 break-words">{userdata.email}</p>
        </div>
      </div>

      <div className="w-full flex gap-3">
        <p className="font-semibold text-gray-700">Contact No:</p>
        {isedit ? (
          <input
            className="w-full text-center text-xl font-bold text-gray-900 border-b-4 border-blue-500 focus:outline-none"
            type="text"
            placeholder="Phone No"
            value={userdata.contact}
            onChange={(e) =>
              setuserdata((prev) => ({ ...prev, contact: e.target.value }))
            }
          />
        ) : (
          <h1 className="text-xl font-bold text-gray-900 text-center">{userdata.contact}</h1>
        )}
      </div>

      <div className="w-full flex justify-center mt-4">
        {isedit ? (
          <button
            onClick={(e)=> { e.stopPropagation();UpdateUserData() }}
            className="px-10 py-3 bg-blue-600 text-white rounded-full"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={(e) =>{  setisedit(true)}}
            className="px-10 py-3 border-2 border-blue-600 text-blue-600 rounded-full"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
    </div>
  );
};

export default MyProfile;
