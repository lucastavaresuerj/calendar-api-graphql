import * as controler from "../../controlers/event.js";

export default {
  Query: {
    event: controler.getEvent,
    events: controler.getEvents,
    userEvents: controler.getUserEvents,
  },
  Mutation: {
    createEvent: controler.createEvent,
    deleteEvent: controler.deleteEvent,
    editEvent: controler.editEvent,
    addGuests: controler.addGuests,
    removeGuests: controler.removeGuests,
  },
};
