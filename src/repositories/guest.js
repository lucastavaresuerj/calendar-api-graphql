import mongoose from "mongoose";

const Event = mongoose.model("Event");

export async function editGuest({ event: { id }, confirmation }, userId) {
  Event.findOneAndUpdate(
    { id, "guests.user": userId },
    { $set: { "guest.$.confirmation": confirmation } }
  );
}
