import Booking from "../models/Booking.js";
import Review from "../models/Review.js";
import Room from "../models/Room.js"

export const checkavailability=async(req,res)=>{
    try{
        console.log("booking check")
        const {roomId,checkIn,checkOut}=req.body
        const roombooking=await Booking.find({
      room: roomId,
      $or: [
        {
          checkIn: { $lte: new Date(checkOut) },
          checkOut: { $gte: new Date(checkIn) }
        }
      ]
    });
    
    const isAvailable = roombooking.length === 0;
    console.log(isAvailable);
    res.json({success:true, available: isAvailable });
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
}

export const BookRoom=async(req,res)=>{
    try{
        const{userId,roomId,checkIn,checkOut,totalPrice,guest}=req.body;
        const user=userId
        const room=roomId
        const newBooking=new Booking({
            user,
            room,
            checkIn,checkOut,totalPrice,guest
        })
        await newBooking.save();
        res.send({success:true,message:"Room booked successfully"})
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
}

export const getbookinguser=async(req,res)=>{
    try{
        const {userId}=req.body;
        const booking=await Booking.find({ user: userId }).populate("room")
        res.json({success:true,booking:booking})
    }
     catch(error){
        res.json({success:false,message:error.message})
    }
}

export const getbookingforhost=async(req,res)=>{
     try {
    const { userId } = req.body;
    const hostRooms = await Room.find({ host: userId }).select("_id");

    const roomIds = hostRooms.map(room => room._id); 

    
    const bookings = await Booking.find({ room: { $in: roomIds } })
      .populate("room")     
      .populate("user", "username email"); 
    
    const totalBookings=bookings.length
    let totalRevenue=0;
      bookings.forEach(item => {
      if (item.isPaid) totalRevenue += item.totalPrice;
    });
    const dashboardData={
        bookings,
        totalBookings,
        totalRevenue
    }
    res.json({ success: true,dashboardData :dashboardData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}



export const giveReview=async(req,res)=>{
    try{
        const{userId,roomId,bookingId,rating,reviewText}=req.body;
        const newReview=new Review({
            user:userId,
            room:roomId,
            booking:bookingId,
            rating,
            reviewText
        })
        await newReview.save();
        const booking=await Booking.findByIdAndUpdate(bookingId,{hasReviewed:true},{new:true});
        res.json({success:true,message:"Review submitted successfully!"})
    }
    catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export const getBookingReview=async(req,res)=>{
    try{
        const {userId}=req.body
        const reviews=await Review.find({user:userId});
        res.json({success:true,reviews});
    }
    catch (error) {
    res.json({ success: false, message: error.message });
  }
}