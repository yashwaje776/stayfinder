import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from "cloudinary"

const registerUser=async(req,res)=>{
    try{
        const {username,email,password,role}=req.body;
        if(!username || !email || !password || !role){
            return res.json({success:false ,message:"Please fill all the fields"})
        }
        if(password.length<8){
            return res.json({success:false ,message:"Password should be at least 8 characters"})
        }
        const user=await User.findOne({email});
        if(user){
            return res.json({success:false ,message:"User already exists"})
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt)
        const newUser=new User({
            username,
            email,
            password:hashedPassword,
            role
        })
        await newUser.save();
        const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET);
        res.json({success:true,token})

    }
    catch(error){
        res.json({success:false ,message:error.message})
    }
}

const loginuser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if( !email || !password){
            return res.json({success:false ,message:"Please fill all the fields"})
        }
        const user=await User.findOne({email});
        if(!user){
            return res.json({success:false ,message:"User Does Not exists"})
        }
        const checkpassword=await bcrypt.compare(password,user.password);
        if(checkpassword){
            const token =jwt.sign({id:user._id},process.env.JWT_SECRET);
            res.json({success:true,token})
        }
    }
    catch(error){
        res.json({success:false ,message:error.message})
    }
}
const getUserData=async(req,res)=>{
    try{
        const {userId}=req.body
        const user=await User.findById(userId).select('-password');
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        res.json({ success: true, userData: user }); 
    }
     catch(error){
        res.json({success:false ,message:error.message})
    }
}
const UpdateuserProfile=async(req,res)=>{
    try{
        const {userId,username,contact}=req.body;
        let imageUrl;
        if(req.file){
            const uploaded = await cloudinary.uploader.upload(req.file.path);
            imageUrl = uploaded.secure_url;
        }
        const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            ...(username && { username }),
            ...(contact && { contact }),
            ...(imageUrl && { image: imageUrl }),
        },
        { new: true }
        ).select("-password");

        res.json({ success: true, message: 'Profile updated successfully', user: updatedUser });
    }
    catch(error){
        res.json({success:false ,message:error.message})
    }
}

export {registerUser,loginuser,getUserData,UpdateuserProfile}