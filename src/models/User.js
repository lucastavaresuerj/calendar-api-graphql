import mongoose from "mongoose";
const { Schema, model } = mongoose;

export default model(
  "User",
  new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
  })
);
