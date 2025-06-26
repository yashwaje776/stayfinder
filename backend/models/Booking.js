import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  totalPrice:{type:Number, required:true},
  guest:{type:Number, required:true},
  status:{type:String,enum:["pending","confirmed","cancelled"],default:"pending"},
  paymentMethod:{type:String,required:true,default:"cash"},
  isPaid:{type:Boolean,required:true,default:false},
  hasReviewed: { type: Boolean, default: false },
}, { timestamps: true });

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;
