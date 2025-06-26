import {v2 as cloudinary} from "cloudinary"
import Room from "../models/Room.js";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Review from "../models/Review.js";

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
      _id: { $nin: roombooking }
    }); 

    res.json({success:true, availableRooms });
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
}
export const unavailableDates=async(req,res)=>{
        try{
            const {roomId}=req.body;
            const bookingRoom=await Booking.find({room:roomId})
            console.log("room",roomId,bookingRoom)
            let unavailableDates = [];
            bookingRoom.forEach((booking) => {
               let current = new Date(booking.checkIn);
               const end = new Date(booking.checkOut);
               while(current <= end){
                unavailableDates.push(new Date(current));
                current.setDate(current.getDate() + 1);
               }
            })
            res.json({success:true,unavailableDates:unavailableDates})
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

export const giveReview=async(req,res)=>{
    try{
        const{userId,roomId,rating,reviewText}=req.body;
        const newReview=new Review({
            user:userId,
            room:roomId,
            rating,
            reviewText
        })
        await newReview.save();
        res.json({success:true,message:"Review submitted successfully!"})
    }
    catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export const getReview=async(req,res)=>{
    try{
        const {roomId}=req.body
        const reviews=await Review.find({room:roomId}).populate({
  path: 'user',
  select: '-password' 
});
        res.json({success:true,reviews});
    }
    catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export const addAndRemovefavorites=async(req,res)=>{
    try{
        const {roomId,userId}=req.body
        const user=await User.findById(userId);
        if (user.favorites.includes(roomId)) {
            user.favorites = user.favorites.filter(id => id.toString() !== roomId);
            await user.save();
            return res.json({ success: true, message: "Removed from favorites" });
        }
        user.favorites.push(roomId);
        await user.save();
        res.json({ success: true, message: "Added to favorites" });
    }
    catch (error) {
    res.json({ success: false, message: error.message });
   }
}

export const getallfavorites=async(req,res)=>{
    try {
    const{userId}=req.body;
    const user = await User.findById(userId).populate('favorites');
    res.json({ success: true, favorites: user.favorites });
   } 
   catch (error) {
    res.json({ success: false, message: error.message });
   }
}

