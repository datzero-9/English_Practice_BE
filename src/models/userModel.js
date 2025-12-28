import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  name: String,
  email: { type: String, required: true },
  photoURL: String,
}, { timestamps: true });

export default mongoose.model('User', userSchema);