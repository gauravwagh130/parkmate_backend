import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Avoid OverwriteModelError in dev mode
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
