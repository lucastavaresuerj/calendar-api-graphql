import mongoose from "mongoose";

const Event = mongoose.model("Event");

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
  return await Event.updateOne({ _id: id, owner }, event);
}

export async function createEvent(event) {
  const newEvent = new Event(event);
  return await newEvent.save();
}

async function editGuest(filter, guests, option) {
  const update = {};
  if (option === "add") {
    update[$push] = { guests: { each: guests } };
  } else if (option == "remove") {
    update[$pullAll] = { guests };
  }
  return await Event.updateOne(filter, update).exec();
}

export async function addGuests({ id, owner, guests }) {
  return editGuest({ _id: id, owner }, guests, "add");
}

export async function removeGuests({ id, owner, guests }) {
  return editGuest({ _id: id, owner }, guests, "remove");
}

export async function deleteEvent(eventId, owner) {
  return await Event.findOneAndRemove({ _id: eventId, owner }).exec();
}
