import mongoose from "mongoose";
const { Schema, model } = mongoose;

export default model(
  "Event",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    begin: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    guests: [
      {
        type: Schema.Types.ObjectId,
        ref: "Guest",
        required: false,
      },
    ],
  })
);
