import mongoose from "mongoose";
import * as repoUser from "./user.js";

const Event = mongoose.model("Event");

function formatGuests(guests = []) {
  return guests.map(({ user: { id } }) => ({
    user: id,
  }));
}

function formatEvents(events) {
  return events;
}

function userRelatedEvents(user) {
  return Event.find({
    $or: [{ owner: user }, { "guests.user": user }],
  }).populate("guests.user owner");
}

export async function getRelatedEvents(user) {
  const events = await userRelatedEvents(user).exec();
  return formatEvents(events);
}

export async function getSearchedEvents(user, queryItems) {
  const eventsQuery = Event.find().populate("owner guests.user");
  console.log(queryItems);
  if (queryItems.id) eventsQuery.where("id").in(queryItems.id);
  if (queryItems.name) eventsQuery.where("name").in(queryItems.name);
  if (queryItems.begin) eventsQuery.where("begin").gte(queryItems.begin);
  if (queryItems.end) eventsQuery.where("end").lte(queryItems.end);

  if (queryItems.guests) {
    const guestsIds = await repoUser.get(
      {
        name: { $in: queryItems.guests.map(({ name }) => name) },
      },
      "id"
    );
    eventsQuery
      .where("guests.user")
      .in([
        ...queryItems.guests.map(({ id }) => id),
        ...guestsIds.map(({ id }) => id),
      ]);
  }

  if (queryItems.owner) {
    const usersIds = await repoUser.get(
      {
        name: { $in: queryItems.owner.map(({ name }) => name) },
      },
      "id"
    );

    eventsQuery
      .where("owner")
      .in([
        ...queryItems.owner.map(({ id }) => id),
        ...usersIds.map(({ id }) => id),
      ]);
  }

  const events = await eventsQuery.exec();
  return formatEvents(events);
}

export async function getOne(user, filter = {}) {
  return await userRelatedEvents(user).findOne(filter).exec();
}

export async function editEvent(filter, event) {
  return await Event.findOneAndUpdate(filter, event);
}

export async function createEvent({ guests, ...event }) {
  const guestsFormatted = formatGuests(guests);
  const newEvent = new Event({ ...event, guests: guestsFormatted });
  await newEvent.save();

  return await newEvent.populate("guests.user owner");
}

async function editGuest(filter, guests, option) {
  const guestsFormatted = formatGuests(guests);
  console.log(guestsFormatted);
  const update = {};
  if (option === "add") {
    update["$push"] = { guests: { $each: guestsFormatted } };
  } else if (option == "remove") {
    update["$pull"] = {
      guests: {
        user: {
          $in: guestsFormatted.map(({ user }) => user),
        },
      },
    };
  }
  await Event.findOneAndUpdate(filter, update).exec();
  return await Event.findOne(filter).populate("guests.user owner").exec();
}

export async function addGuests(filter, guests) {
  return await editGuest(filter, guests, "add");
}

export async function removeGuests(filter, guests) {
  return await editGuest(filter, guests, "remove");
}

export async function deleteEvent(eventId, owner) {
  return await Event.findOneAndRemove({ id: eventId, owner }).exec();
}
