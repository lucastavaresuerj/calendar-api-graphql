import * as repository from "../repositories/event.js";
import { Contract } from "../validators/index.js";

export async function getEvents(parent, { search }, { userId }, info) {
  return await repository.getSearchedEvents(userId, search);
}

export async function getUserEvents(parent, { range }, { userId }, info) {
  return await repository.getRelatedEvents(userId, range);
}

export async function getEvent(parent, { id }, { userId }, info) {
  const event = await repository.getOne(userId, { _id: id });
  Contract.isRequired(event, "The query has no results");

  return event;
}

export async function createEvent(parent, { event }, { userId }, info) {
  return await repository.createEvent({ ...event, owner: userId });
}

export async function deleteEvent(parent, { event: { id } }, { userId }, info) {
  return await repository.deleteEvent(userId, id);
}

export async function editEvent(
  parent,
  { event: { id, ...event } },
  { userId },
  info
) {
  const eventEdited = await repository.editEvent({ id, owner: userId }, event);
  Contract.isRequired(eventEdited, "The query has no results");

  return eventEdited;
}

export async function addGuests(
  parent,
  { event: { id }, guests },
  { userId },
  info
) {
  const event = await repository.addGuests({ id, owner: userId }, guests);
  Contract.isRequired(event, "The query has no results");

  return event;
}

export async function removeGuests(
  parent,
  { event: { id }, guests },
  { userId },
  info
) {
  const event = await repository.removeGuests({ id, owner: userId }, guests);
  Contract.isRequired(event, "The query has no results");

  return event;
}
