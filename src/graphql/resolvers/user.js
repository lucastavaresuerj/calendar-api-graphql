import * as controler from "../../controlers/user.js";

export default {
  Query: {
    users: controler.getUsers,
    user: controler.getUser,
    person: controler.getPerson,
  },
  Person: {
    __resolveType(obj, context, info) {
      if (obj.name) {
        return "User";
      }
      if (obj.confirmation) {
        return "Guest";
      }
    },
  },
};
