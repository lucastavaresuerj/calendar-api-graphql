import mongoose from "mongoose";

const Event = mongoose.model("Event");

function formatGuests(guests = []) {
  return guests.map(({ user: { id } }) => ({
    user: id,
  }));
}

export async function get(query = {}, operator = "and") {
  const search = {
    [`$${operator}`]: [
      { owner: query?.owner },
      { name: query?.name },
      { guests: query?.guests },
      {
        $and: [
          { begin: query?.begin && { $gte: query.begin } },
          { end: query?.end && { $lte: query.end } },
        ],
      },
    ],
  };

  return await Event.find(search).exec();
}

export async function getOne(query = {}) {
  return await Event.findOne(query).exec();
}

export async function editEvent({ id, owner, ...event }) {
  return await Event.findOneAndUpdate({ _id: id, owner }, event);
}

export async function createEvent({ guests, ...event }) {
  const guestsFormatted = formatGuests(guests);
  const newEvent = new Event({ ...event, guests: guestsFormatted });
  await newEvent.save();

  return newEvent.populate({ path: "guests.user" });
}

async function editGuest(filter, guests, option) {
  const guestsFormatted = formatGuests(guests);
  const update = {};
  if (option === "add") {
    update["$push"] = { guests: { $each: guestsFormatted } };
  } else if (option == "remove") {
    update["$pull"] = {
      guests: { "user.id": { $in: guestsFormatted.map(({ id }) => id) } },
    };
  }
  await Event.findOneAndUpdate(filter, update).exec();
  return await Event.findOne(filter).populate("guests.user").exec();
}

export async function addGuests({ id, owner }, guests) {
  return editGuest({ id, owner }, guests, "add");
}

export async function removeGuests({ id, owner }, guests) {
  return editGuest({ id, owner }, guests, "remove");
}

export async function deleteEvent(eventId, owner) {
  return await Event.findOneAndRemove({ id: eventId, owner }).exec();
}
