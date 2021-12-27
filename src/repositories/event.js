import mongoose from "mongoose";

import * as repoUser from "./user.js";
import { DateUtil } from "../util/index.js";

const Event = mongoose.model("Event");

function formatGuests(guests = []) {
  return guests.map(({ user: { id }, confirmation }) => ({
    user: id,
    confirmation,
  }));
}

function formatEvents(events, startDay, endDay) {
  console.log(events);
  const daysInrange = DateUtil.getDaysBetween(startDay, endDay);

  return daysInrange.map((day) => ({
    date: day,
    events: events.filter(({ begin, end }) => {
      console.log(
        begin.getTime(),
        day.getTime(),
        end.getTime(),
        begin.getTime() <= day.getTime() && end.getTime() >= day.getTime()
      );

      return (
        (begin.getTime() <= day.getTime() && end.getTime() >= day.getTime()) ||
        DateUtil.dateDiffDay(day, begin) == 0
      );
    }),
  }));
}

function userRelatedEvents(user) {
  return Event.find({
    $or: [{ owner: user }, { "guests.user": user }],
  }).populate("guests.user owner");
}

export async function getRelatedEvents(user, { begin, end }) {
  const events = await userRelatedEvents(user)
    .and({ $or: [{ begin: { $gte: begin } }, { end: { $lte: end } }] })
    .exec();
  const eventsMapToObject = events.map((event) => event.toObject());
  return formatEvents(eventsMapToObject, begin, end);
}

export async function getSearchedEvents(user, queryItems) {
  const eventsQuery = userRelatedEvents(user);

  async function getIdsByUserNames(names) {
    const ids = await repoUser.get(
      { name: { $in: names.map(({ name }) => name) } },
      "id"
    );
    return ids.map(({ id }) => id);
  }

  if (queryItems.id) eventsQuery.where("id").in(queryItems.id);
  if (queryItems.name) eventsQuery.where("name").in(queryItems.name);
  if (queryItems.begin) eventsQuery.where("begin").gte(queryItems.begin);
  if (queryItems.end) eventsQuery.where("end").lte(queryItems.end);

  if (queryItems.guests) {
    const guestsIds = getIdsByUserNames(queryItems.guests);
    eventsQuery
      .where("guests.user")
      .in([...queryItems.guests.map(({ id }) => id), ...guestsIds]);
  }

  if (queryItems.owner) {
    const usersIds = getIdsByUserNames(queryItems.owner);
    eventsQuery
      .where("owner")
      .in([...queryItems.owner.map(({ id }) => id), ...usersIds]);
  }

  return await eventsQuery.exec();
}

export async function getOne(user, filter = {}) {
  return await userRelatedEvents(user).and(filter).findOne().exec();
}

export async function editEvent(filter, { guests, ...event }) {
  const guestsFormatted = formatGuests(guests);
  const ret = await Event.findOneAndUpdate(
    filter,
    { $set: { guests: guestsFormatted, ...event } },
    { new: true }
  )
    .populate("guests.user owner")
    .exec();
  return ret;
}

export async function createEvent({ guests, ...event }) {
  const guestsFormatted = formatGuests(guests);
  const newEvent = new Event({ ...event, guests: guestsFormatted });
  await newEvent.save();

  return await newEvent.populate("guests.user owner");
}

async function editGuest(filter, guests, option) {
  const guestsFormatted = formatGuests(guests);
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

export async function deleteEvent(owner, eventId) {
  return await Event.findOneAndRemove({ id: eventId, owner })
    .populate("guests.user owner")
    .exec();
}
