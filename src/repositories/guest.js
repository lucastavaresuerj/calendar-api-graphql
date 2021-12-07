import mongoose from "mongoose";

const Guest = mongoose.model("Guest");

export async function get(query = {}) {
  return await Guest.find(query).exec();
}

export async function getOne(query = {}) {
  return await Guest.findOne(query).exec();
}

export async function editGuest({ id, confirmation }) {
  return await Guest.updateOne({ id }, { confirmation });
}

export async function createGuest(guest) {
  const newGuest = new Guest(guest);
  return await newGuest.save();
}

export async function deleteGuest(guestId) {
  return await Guest.findByIdAndRemove(guestId).exec();
}
