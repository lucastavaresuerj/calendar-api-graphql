import bcrypt from "bcrypt";

const { PASSWORD_SECRET, PASSWORD_SALT } = process.env;

export function checkPassword(password = "", passwordEncripted = "") {
  return bcrypt.compareSync(password + PASSWORD_SECRET, passwordEncripted);
}

export function createHashPassword(password = "") {
  return bcrypt.hashSync(password + PASSWORD_SECRET, parseInt(PASSWORD_SALT));
}

// console.log(createHashPassword());
// console.log(createHashPassword(""));
// console.log(createHashPassword("123456789"));
// console.log(createHashPassword("M)w_cqIc.H"));
