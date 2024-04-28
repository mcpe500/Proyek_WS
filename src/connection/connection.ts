import mongoose, { ConnectOptions } from "mongoose";
import { ENV } from "../config/environment";
import { Sequelize } from "sequelize";

const connectMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(ENV.MONGODB_URI);
    console.log("MongoDB connected...");
  } catch (err: any) {
    console.error(err.message);
  }
};

const connectStaticDB = async () => {
  //create the connection for mysql here
};

export default connectMongoDB;
