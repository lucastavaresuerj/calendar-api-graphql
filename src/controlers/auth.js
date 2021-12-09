import { AuthenticationError } from "apollo-server-errors";

import * as repository from "../repositories/user.js";
import { Contract } from "../validators/index.js";
import { creatHashPassword, checkPassword } from "../auth/password.js";
import { createToken } from "../auth/token.js";

export async function login(req, res, next) {
  const { name, password } = req.body;
  const user = await repository.getOne({ name }, "id password");
  if (checkPassword(password, user.password)) {
    return res.send(createToken({ id: user.id }));
  }
  throw new AuthenticationError("Could not make login");
}

export async function signin(req, res, next) {
  const { name, password } = req.body;
  const user = await repository.get({ name });

  const contract = new Contract();
  try {
    contract.hasMinLen(name, 2);
    contract.hasMaxLen(user, 0);
  } catch (error) {
    console.log("TODO: erro signin", error.message);
    return res.send("bad signin");
  }

  const encriptedPassword = creatHashPassword(password);
  const newUser = await repository.createUser({
    name,
    password: encriptedPassword,
  });
  return res.send(createToken({ id: newUser.id }));
}

export async function logout(req, res, next) {
  res.send("TODO: fazer função de logout");
}
