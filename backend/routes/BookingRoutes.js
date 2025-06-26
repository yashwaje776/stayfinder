import express from "express"
import { BookRoom, checkavailability, getbookingforhost, getBookingReview, getbookinguser, giveReview } from "../controllers/Bookingcontrollers.js";
import authUser from "../middelware/authUser.js";

const BookingRouter=express.Router();

BookingRouter.post('/check',checkavailability)
BookingRouter.post('/book',authUser,BookRoom);
BookingRouter.post('/booking-user',authUser,getbookinguser);
BookingRouter.post('/booking-host',authUser,getbookingforhost)
BookingRouter.post('/review',authUser,giveReview)
BookingRouter.post('/getBookingReview',authUser,getBookingReview)



export default BookingRouter