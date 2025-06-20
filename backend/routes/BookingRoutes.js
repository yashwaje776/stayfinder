import express from "express"
import { BookRoom, checkavailability, getbookingforhost, getbookinguser } from "../controllers/Bookingcontrollers.js";
import authUser from "../middelware/authUser.js";

const BookingRouter=express.Router();

BookingRouter.post('/check',checkavailability)
BookingRouter.post('/book',authUser,BookRoom);
BookingRouter.post('/booking-user',authUser,getbookinguser);
BookingRouter.post('/booking-host',authUser,getbookingforhost)

export default BookingRouter