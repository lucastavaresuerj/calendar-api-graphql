import { gql } from "apollo-server-core";

export default gql(`#graphql
  type Mutation {
		createEvent(event: EventCreate): Event
    deleteEvent(event: EventEdit): Event
    editEvent(event: EventEdit): Event
    addGuests(event: EventEdit): Event
    removeGuests(event: EventEdit): Event
  }
`);
