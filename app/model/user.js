import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: Number,
  whatsapp: String,
  imo: String,
  profilePicture: String,
  role: {
    type: String,
    default: 'user'
  },
  image: String,
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ad' }],

}, { timestamps: true });

// export const User = mongoose.models.User || mongoose.model('User', userSchema);
export default mongoose.models.User || mongoose.model('User', userSchema);