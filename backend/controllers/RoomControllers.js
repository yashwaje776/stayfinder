import {v2 as cloudinary} from "cloudinary"
import Room from "../models/Room.js";
import User from "../models/User.js";

export const checkavailability=async(req,res)=>{
    try{
        const {checkIn,checkOut}=req.body
        const roombooking=await Booking.find({
            $or: [
                {
                checkIn: { $lte: new Date(checkOut) },
                checkOut: { $gte: new Date(checkIn) }
                }
            ]
        }).distinct('room');
     const availableRooms = await Room.find({
      _id: { $nin: bookedRooms }
    }); 

    res.json({success:true, availableRooms });
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
}

export const AddRoom=async(req,res)=>{
    try{
        const {title,description,location,price,userId,guest,bedroom,beds,bathroom,amenities,city,roomType}=req.body
        const host=userId;
        
        const uploadImages=req.files.map(async(file)=>{
            const response=await cloudinary.uploader.upload(file.path);
            return response.secure_url;
        })
        const images= await Promise.all(uploadImages);
        const user=await Room.find({host:userId});
        if(user){
            const hostuser=await User.findByIdAndUpdate(userId,{role:"host"},{new:true});
        }
        const newRoom=new Room({
            title,
            description,location,price,host,guest,bedroom,beds,bathroom,amenities:JSON.parse(amenities),city,
            images,roomType
        })
        await newRoom.save();
        console.log(newRoom)
        res.json({success:true,message:"room is created"})
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
}

export const getallroom=async(req,res)=>{
    try{
        const room =await Room.find().populate('host',"username contact image").sort({ createdAt: -1 });
        res.json({success:true,Room:room});
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
}

export const OwnersRoom=async(req,res)=>{
    try{
        const{userId}=req.body
        const room = await Room.find({ host: userId }).sort({ createdAt: -1 });
        res.json({success:true,Room:room});
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
}

export const ChangeAvailabilty = async (req, res) => {
  try {
    const { roomId } = req.body;

    
    const room = await Room.findById(roomId);
    if (!room) {
      return res.json({ success: false, message: "Room not found" });
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { availability: !room.availability },
      { new: true }
    );

    res.json({ success: true, message: "Availability has been changed", room: updatedRoom });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


