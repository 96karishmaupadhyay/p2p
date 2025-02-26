import mongoose from 'mongoose';
import config from "./config.js";

const { mongoUri } = config; 

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB; // Correct ES module export
