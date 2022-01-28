import * as repository from "../repositories/user.js";

export function getUsers(parent, args, { userId }, info) {
  return repository.get();
}

export function getUser(parent, { id }, { userId }, info) {
  return repository.getOne({ _id: id });
}

export function getPerson(parent, { contains }, { userId }, info) {
  // For test
  const people = [
    { id: 1, name: "Ella Ball" },
    { confirmation: true, user: { id: 1, name: "Lucas Sharp" } },
    { id: 1, name: "Adrian Peake" },
    { id: 1, name: "John Jackson" },
    { confirmation: false, user: { id: 1, name: "Kevin Greene" } },
    { id: 1, name: "Caroline Russell" },
    { id: 1, name: "Pippa Rutherford" },
    { confirmation: true, user: { id: 1, name: "John Newman" } },
    { id: 1, name: "Yvonne Gibson" },
    { id: 1, name: "Pippa McGrath" },
  ];

  const ret = people.filter((person) => {
    const name = person.name ? person.name : person.user.name;
    return name.indexOf(contains) > 0;
  });

  console.log(ret);
  return ret;
}
