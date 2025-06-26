import express from "express"
import upload from "../middelware/multer.js";
import authUser from "../middelware/authUser.js";
import { addAndRemovefavorites, AddRoom, ChangeAvailabilty, checkavailability, getallfavorites, getallroom, getReview, giveReview, OwnersRoom, unavailableDates } from "../controllers/RoomControllers.js";

const roomRouter=express.Router();

roomRouter.post('/',upload.array('images',4),authUser,AddRoom)
roomRouter.get('/get-Room',getallroom)
roomRouter.post('/owner-room',authUser,OwnersRoom)
roomRouter.post('/update',authUser,ChangeAvailabilty)
roomRouter.post('/check',checkavailability)
roomRouter.post('/unavailable',unavailableDates)
roomRouter.post('/review',authUser,giveReview)
roomRouter.post('/getreview',getReview)
roomRouter.post('/add-remove',authUser,addAndRemovefavorites)
roomRouter.post('/getfavorites',authUser,getallfavorites)

export default roomRouter