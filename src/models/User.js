import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  token: String,
});

export default model("User", schema);

// Duplicate the ID field.
schema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
schema.set("toJSON", {
  virtuals: true,
});

// Ensure virtual fields are shown when convert to Object.
schema.set("toObject", { getters: true });
