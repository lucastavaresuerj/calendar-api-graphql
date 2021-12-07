import mongoose from "mongoose";
const { Schema, model } = mongoose;

export default model(
  "Guest",
  new Schema({
    confirmation: {
      type: Object,
      enum: [false, true, "awaiting"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  })
);
