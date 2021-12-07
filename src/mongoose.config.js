import mongoose from "mongoose";
import "./models/index.js";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Mongodb connected!"));
