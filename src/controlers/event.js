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

export async function createEvent(parent, { event }, { userId }, info) {
  return await repository.createEvent({ ...event, owner: userId });
}

export async function deleteEvent(parent, { event }, { userId }, info) {
  return await repository.deleteEvent(event.id, userId);
}

export async function addGuests(parent, { event }, { userId }, info) {
  return await repository.addGuests({ ...event, owner: userId });
}

export async function removeGuests(parent, { event }, { userId }, info) {
  return await repository.removeGuests({ ...event, owner: userId });
}
