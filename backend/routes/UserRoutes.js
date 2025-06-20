import express from "express";
import { getUserData, loginuser, registerUser, UpdateuserProfile } from "../controllers/UserControllers.js";
import authUser from "../middelware/authUser.js";
import upload from "../middelware/multer.js";

const UserRouter=express.Router()

UserRouter.post('/register',registerUser);
UserRouter.post('/login',loginuser);
UserRouter.post('/getuserdata',authUser,getUserData);
UserRouter.post('/UpdateuserProfile',upload.single("file"),authUser,UpdateuserProfile)

export default UserRouter