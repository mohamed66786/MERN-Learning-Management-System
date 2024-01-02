import { app } from "./app";
import connectDB from "./utils/db";
import { v2 as cloudinary } from "cloudinary";
require("dotenv").config();

// cloudinary configuration
// note: cloudinary only accepts base 64 data
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

//creating our server
app.listen(process.env.PORT || 8000, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
  connectDB();
});
