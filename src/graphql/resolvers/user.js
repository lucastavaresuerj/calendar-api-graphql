import * as controler from "../../controlers/user.js";

export default {
  Query: {
    users: controler.getUsers,
    user: controler.getUser,
  },
};
