import mongoose from "mongoose";

import * as repoUser from "./user.js";
import { DateUtil } from "../util/index.js";

const Event = mongoose.model("Event");

function formatGuests(guests = []) {
  return guests.map(({ user: { id } }) => ({
    user: id,
  }));
}

function formatEvents(events) {
  function formattDaysEvents(accumulator, { begin, end, ...restEvent }) {
    function addKeyValueToAcc(key, value) {
      return {
        ...accumulator,
        [key]: accumulator[key] ? [...accumulator[key], value] : [value],
      };
    }

    let daysDiff = DateUtil.dateDiffDay(end, begin);
    if (daysDiff == 0) {
      let keyDate = DateUtil.getDateDayString(begin);
      return addKeyValueToAcc(keyDate, { ...restEvent, begin, end });
    } else {
      let daysBetween = DateUtil.getDaysBetween(begin, end);

      return daysBetween.reduce((acc, day) => {
        let keyDate = DateUtil.getDateDayString(day);
        return {
          ...addKeyValueToAcc(keyDate, { ...restEvent, begin, end }),
          ...acc,
        };
      }, {});
    }
  }

  events = events.map((event) => event.toObject());

  const daysKeys = events.reduce(formattDaysEvents, {});
  const ret = Object.keys(daysKeys)
    .map((date) => ({
      date: new Date(date),
      events: daysKeys[date],
    }))
    .sort((a, b) => (a.date.getTime() < b.date.getTime() ? -1 : 1));

  console.log(ret[0].events);
  return ret;
}

function userRelatedEvents(user) {
  return Event.find({
    $or: [{ owner: user }, { "guests.user": user }],
  }).populate("guests.user owner");
}

export async function getRelatedEvents(user, { begin, end }) {
  const events = await userRelatedEvents(user)
    .find({ begin: { $gte: begin }, end: { $lte: end } })
    .exec();
  return formatEvents(events);
}

export async function getSearchedEvents(user, queryItems) {
  const eventsQuery = Event.find().populate("owner guests.user");

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
  return await userRelatedEvents(user).findOne(filter).exec();
}

export async function editEvent(filter, event) {
  console.log("filter", filter, "event", event);
  return await Event.findOneAndUpdate(filter, event, { new: true })
    .populate("guests.user owner")
    .exec();
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

export async function deleteEvent(owner, eventId) {
  return await Event.findOneAndRemove({ id: eventId, owner }).exec();
}
