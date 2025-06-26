import mongoose from "mongoose";

const reviewSchema =new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref: 'User', required: true,},
    room:{type:mongoose.Schema.Types.ObjectId,ref: 'Room', required: true,},
    booking:{type:mongoose.Schema.Types.ObjectId,ref:'Booking',required:true},
    rating: {type: Number,min: 1,max: 5,required: true,},
    reviewText: {type: String,required: true,}
},{timestamps:true})

const Review=mongoose.model('Review',reviewSchema)

export default Review