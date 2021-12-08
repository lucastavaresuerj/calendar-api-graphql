import * as controler from "../../controlers/event.js"

export default {
  Query: {
    events: controler.getEvents,
    userEvents: controler.getUserEvents,
    event: controler.getEvent,
  },
  Mutation: {
    createEvent: controler.createEvent,
    deleteEvent: controler.deleteEvent,
    addGuests: controler.addGuests,
    removeGuests: controler.removeGuests
  }
};
