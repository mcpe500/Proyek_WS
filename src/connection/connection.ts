import mongoose, { ConnectOptions } from "mongoose";
import { ENV } from "../config/environment";

const connectMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(ENV.MONGODB_URI);
    console.log("MongoDB connected...");
  } catch (err: any) {
    console.error(err.message);
  }
};
const closeMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed...");
  } catch (err: any) {
    console.error(err.message);
  }
};

export { connectMongoDB, closeMongoDB };
