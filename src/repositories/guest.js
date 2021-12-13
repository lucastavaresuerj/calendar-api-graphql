import mongoose from "mongoose";

const Event = mongoose.model("Event");

export async function editGuest({ event: { id }, confirmation }, userId) {
  return await Event.findOneAndUpdate(
    { _id: id, guests: { $elemMatch: { user: userId } } },
    { $set: { "guests.$.confirmation": confirmation } },
    { new: true, safe: true, upsert: true }
  )
    .select({ guests: { $elemMatch: { user: userId } } })
    .populate("guests.user")
    .exec();
}
