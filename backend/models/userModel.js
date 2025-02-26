import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  online: { type: Boolean, default: false },
});

export const User = mongoose.model("User_db", userSchema);
