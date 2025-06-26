// UserContext.jsx
import { useState, useEffect, createContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, settoken] = useState(localStorage.getItem("token") || "");
  const [userData, setuserData] = useState(false);
  const [room, setroom] = useState([]);
  const [userRoom, setuserRoom] = useState([]);
  const [onuser, setonuser] = useState(false);
  const [roomData, setroomdata] = useState();
  const [Favourite, setFavourite] = useState([]);

  const currencysymbol = "₹";
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const getfavourite = async () => {
    try {
      const { data } = await axios.post(`${backend_url}/api/rooms/getfavorites`, {}, {
        headers: { token },
      });
      if (data.success) {
        setFavourite(data.favorites);
      }
    } catch (error) {}
  };

  const getAllRoom = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/api/rooms/get-Room`);
      if (data.success) {
        setroom(data.Room);
      }
    } catch (error) {}
  };

  const getRoom = async () => {
    try {
      const { data } = await axios.post(`${backend_url}/api/rooms/owner-room`, {}, {
        headers: { token },
      });
      if (data.success) {
        setuserRoom(data.Room);
      }
    } catch (error) {}
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.post(`${backend_url}/api/user/getuserdata`, {}, {
        headers: { token },
      });
      if (data.success) {
        setuserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addAndRemovefavorites = async (roomId) => {
    try {
      const { data } = await axios.post(`${backend_url}/api/rooms/add-remove`, { roomId }, {
        headers: { token },
      });
      if (data.success) {
        getUserData();
        toast.success(data.message)
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (token) {
      getUserData();
      getfavourite();
    } else {
      setuserData(false);
    }
  }, [token]);

  useEffect(() => {
    getAllRoom();
  }, []);

  useEffect(() => {
    if (token && userData && userData.role === "host") {
      getRoom();
    }
  }, [token, userData]);

  const value = {
    token,
    settoken,
    backend_url,
    userData,
    setuserData,
    room,
    setroom,
    currencysymbol,
    getAllRoom,
    getRoom,
    onuser,
    setonuser,
    roomData,
    setroomdata,
    addAndRemovefavorites,
    Favourite,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
