import mongoose from "mongoose";

const User = mongoose.model("User");

function hasPasswordField(password = false) {
  return `_id name ${password ? "password" : ""}`;
}

export async function get(query = {}) {
  return await User.find(query, hasPasswordField()).exec();
}

export async function getOne(query = {}, password = false) {
  return await User.findOne(query, hasPasswordField(password)).exec();
}

export async function createUser(user) {
  const newUser = new User(user);
  return await newUser.save();
}

export async function deleteUser(userId) {
  return await User.findByIdAndRemove(id).exec();
}
