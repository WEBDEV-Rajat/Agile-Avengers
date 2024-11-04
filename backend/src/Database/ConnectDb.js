import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connectDB = async () => {
  try {
    
    console.log("MongoDB URI:", process.env.MONGODB_URI);

    // return object
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `mongodb connection succeeded Host : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Error connecting to database :", error);
    process.exit(1);
    // Learn more about process exit
  }
};

export default connectDB;
