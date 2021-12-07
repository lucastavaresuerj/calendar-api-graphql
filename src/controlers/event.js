import * as repository from "../repositories/event.js";

export async function getEvents(parent, { search }, { userId }, info) {
  return await repository.get({ ...search, owner: userId });
}

export async function getUserEvents(parent, { userId }, info) {
  return await repository.get({ owner: userId, guests: [userId] }, "or");
}

export async function getEvent(parent, { id }, context, info) {
  return await repository.getOne({ _id: id });
}
