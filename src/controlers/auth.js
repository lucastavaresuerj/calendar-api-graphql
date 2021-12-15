import { AuthenticationError } from "apollo-server-errors";

import * as repository from "../repositories/user.js";
import { Contract } from "../validators/index.js";
import { creatHashPassword, checkPassword } from "../auth/password.js";
import { createToken } from "../auth/token.js";

export async function login(req, res, next) {
  const { name, password } = req.body;
  const user = await repository.getOne({ name }, "id password");

  try {
    Contract.isRequired(user, "Name or passord are wrong");
    if (checkPassword(password, user.password)) {
      return res.status(200).send({ token: createToken({ id: user.id }) });
    }
  } catch (error) {
    return next(new AuthenticationError(error.message));
  }
  return next(new AuthenticationError("Name or passord are wrong"));
}

export async function signin(req, res, next) {
  const { name, password } = req.body;
  const user = await repository.get({ name });

  try {
    Contract.hasMinLen(name, 2, "name must have at least 2 characters");
    Contract.hasMaxLen(user, 0, "Username already taken");
  } catch (error) {
    error.message = `Signin error: ${error.message}`;
    return next(error);
  }

  const encriptedPassword = creatHashPassword(password);
  const newUser = await repository.createUser({
    name,
    password: encriptedPassword,
  });

  return res.status(200).send({ token: createToken({ id: newUser.id }) });
}

export async function logout(req, res, next) {
  res.send("TODO: fazer função de logout");
}
