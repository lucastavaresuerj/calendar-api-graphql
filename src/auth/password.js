import bcrypt from "bcrypt";

const { PASSWORD_SECRET, PASSWORD_SALT } = process.env;

export function checkPassword(password = "", passwordEncripted = "") {
  return bcrypt.compareSync(password + PASSWORD_SECRET, passwordEncripted);
}

export function creatHashPassword(password = "") {
  return bcrypt.hashSync(password + PASSWORD_SECRET, parseInt(PASSWORD_SALT));
}
