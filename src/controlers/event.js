import * as repository from "../repositories/event.js";
import { Contract } from "../validators/index.js";

export async function getEvents(parent, { search }, { userId }, info) {
  return await repository.getSearchedEvents(userId, search);
}

export async function getUserEvents(parent, args, { userId }, info) {
  return await repository.getRelatedEvents(userId);
}

export async function getEvent(parent, { id, sei }, { userId }, info) {
  return await repository.getOne(userId, { _id: id });
}

export async function createEvent(parent, { event }, { userId }, info) {
  return await repository.createEvent({ ...event, owner: userId });
}

export async function deleteEvent(parent, { event }, { userId }, info) {
  return await repository.deleteEvent(event.id, userId);
}

export async function addGuests(
  parent,
  { event: { guests, id } },
  { userId },
  info
) {
  const contract = new Contract();
  const event = await repository.addGuests({ id, owner: userId }, guests);

  contract.isRequired(event, "The query has no results");

  return event;
}

export async function removeGuests(
  parent,
  { event: { guests, id } },
  { userId },
  info
) {
  return await repository.removeGuests({ id, owner: userId }, guests);
}
