import mongoose from "mongoose";
const { Schema, model } = mongoose;

export default model(
  "Event",
  new Schema({
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
        confirmation: {
          type: Object,
          enum: [false, true, "awaiting"],
          default: "awaiting",
          required: true,
        },
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
  })
);
