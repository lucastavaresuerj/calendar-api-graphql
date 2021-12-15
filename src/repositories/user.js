import mongoose from "mongoose";

const User = mongoose.model("User");

export async function get(query = {}, projection = "id name") {
  return await User.find(query, projection).exec();
}

export async function getOne(query = {}, projection = "id name password") {
  return await User.findOne(query, projection).exec();
}

export async function createUser(user) {
  const newUser = new User(user);
  return await newUser.save();
}

export async function deleteUser(userId) {
  return await User.findByIdAndRemove(userId).exec();
}
