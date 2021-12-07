import * as repository from "../repositories/user.js";

export function getUsers() {
  return repository.get();
}

export function getUser(id) {
  return repository.getOne({ _id: id });
}
