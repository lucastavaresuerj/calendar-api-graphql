import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schema = new Schema({
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
});

export default model("Event", schema);

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
