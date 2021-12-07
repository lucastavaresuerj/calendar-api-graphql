import * as repository from "../repositories/user.js";
import { Contract } from "../validators/index.js";
import { creatHashPassword } from "../auth/password.js";

export function getUsers() {
  return repository.get();
}

export function getUser(id) {
  return repository.getOne({ _id: id });
}
