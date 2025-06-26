import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  city:{type: String, required: true},
  roomType:{type: String, required: true},
  price: { type: Number, required: true }, 
  images: [{ type: String }],
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  availability: { type: Boolean, default: true },

  guest: { type: Number, required: true },
  bedroom: { type: Number, required: true },
  beds: { type: Number, required: true },
  bathroom: { type: Number, required: true },

  amenities: { type: [String], required: true }
}, { timestamps: true });

const Room = mongoose.model('Room', RoomSchema);

export default Room;
