import express from "express"
import upload from "../middelware/multer.js";
import authUser from "../middelware/authUser.js";
import { AddRoom, ChangeAvailabilty, getallroom, OwnersRoom } from "../controllers/RoomControllers.js";

const roomRouter=express.Router();

roomRouter.post('/',upload.array('images',4),authUser,AddRoom)
roomRouter.get('/get-Room',getallroom);
roomRouter.post('/owner-room',authUser,OwnersRoom);
roomRouter.post('/update',authUser,ChangeAvailabilty)

export default roomRouter