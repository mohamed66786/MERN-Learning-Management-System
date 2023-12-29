import { app } from "./app";
import connectDB from "./utils/db";
require("dotenv").config();

//creating our server
app.listen(process.env.PORT || 8000, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
  connectDB();
});
