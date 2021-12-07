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

export async function editEvent({ id, ...event }) {
  return await Event.updateOne({ id }, event);
}

export async function createEvent(event) {
  const newEvent = new Event(event);
  return await newEvent.save();
}

export async function deleteEvent(eventId) {
  return await Event.findByIdAndRemove(eventId).exec();
}
