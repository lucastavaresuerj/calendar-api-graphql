import { gql } from "apollo-server-core";

export default gql(`#graphql
  type Mutation {
		createEvent(event: EventCreate): Event
    deleteEvent(event: EventInput): Event
    editEvent(event: EventEdit): Event
    addGuests(event: EventInput, guests: [GuestUser!]!): Event
    removeGuests(event: EventInput, guests: [GuestUser!]!): Event
  }
`);
