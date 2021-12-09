import { gql } from "apollo-server-core";

export default gql(`#graphql
  type Mutation {
		createEvent(event: EventCreate): Event
    deleteEvent(event: EventInput): Event
    editEvent(event: EventEdit): Event
    addGuests(event: EventChangeGuests): Event
    removeGuests(event: EventChangeGuests): Event
  }
`);
