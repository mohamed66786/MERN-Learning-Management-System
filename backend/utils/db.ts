import mongoose from "mongoose";
require("dotenv").config();

const DBURL: string = process.env.DB_URI || "";
const connectDB = async () => {
  try {
    await mongoose.connect(DBURL).then((data:any)=>{
        console.log("Database connection Successfully")
    });
  } catch (error:any) {
    console.log(error.message);
    setTimeout(connectDB,5000)
  }
};

export default connectDB;