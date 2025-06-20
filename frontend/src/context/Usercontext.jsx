import { useState, useEffect, createContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [token, settoken] = useState(localStorage.getItem("token") || "");
  const [userData, setuserData] = useState(false);
  const [room, setroom] = useState([]);
  const [userRoom,setuserRoom]=useState([]);
  const currencysymbol = "₹";
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const getAllRoom = async () => {
    try {
        const { data } = await axios.get(`${backend_url}/api/rooms/get-Room`);
      if (data.success) {
        console.log(data.Room)
        setroom(data.Room);
      }
    } catch (error) {
      //toast.error(error.message);
    }
  };
  const getRoom=async()=>{
    try{
        const{data}=await axios.post(`${backend_url}/api/rooms/owner-room`,{},{headers:{token}});
        console.log(data);
        if(data.success){
            setuserRoom(data.Room);
        }
    }
    catch (error) {
      //toast.error(error.message);
    }
  }


  const getUserData = async () => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/user/getuserdata`,
        {},
        { headers: { token } }
      );
      if (data.success) {
        setuserData(data.userData);
        console.log("User data:", data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserData();
    } else {
      setuserData(false);
    }
  }, [token]);

  useEffect(() => {
    getAllRoom();
  }, []);
  useEffect(()=>{
    if(token && userData){
        if(userData.role==="host"){
            getRoom()
        }
    }
  },[token,userData])

  const value = {
    token,
    settoken,
    backend_url,
    userData,
    setuserData,
    room,
    setroom,
    currencysymbol,getAllRoom,getRoom
  };

  return <UserContext.Provider value={value}
  >{props.children}

  </UserContext.Provider>;
};

export default UserContextProvider;
