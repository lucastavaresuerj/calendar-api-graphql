import { AuthenticationError } from "apollo-server-errors";

import * as repository from "../repositories/user.js";
import { Contract } from "../validators/index.js";
import { creatHashPassword, checkPassword } from "../auth/password.js";
import { verifyToken } from "../auth/token.js";

import { createToken } from "../auth/token.js";
import { blackList } from "../services/index.js";

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
    Contract.hasMaxLen(user, 0, "Username already taken");
    Contract.hasMinLen(name, 2, "name must have at least 2 characters");
    Contract.hasMinLen(password, 6, "password must have at least 6 characters");
  } catch (error) {
    return next(new AuthenticationError(error.message));
  }

  const encriptedPassword = creatHashPassword(password);
  const newUser = await repository.createUser({
    name,
    password: encriptedPassword,
  });

  return res.status(200).send({ token: createToken({ id: newUser.id }) });
}

export async function logout(req, res, next) {
  const token = req.headers["x-access-token"];

  try {
    Contract.isRequired(token, 'Need provide a token on "x-access-token"');
    verifyToken(token);
  } catch (error) {
    return next(error);
  }

  blackList.add(token);
  res.status(200).send({ message: "logout done" });
}
