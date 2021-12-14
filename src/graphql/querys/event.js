import { gql } from "apollo-server-express";

export default gql(`#graphql
  type Query {
		event(id: String!): Event
    userEvents(range: DateRange!): [Day]!
    events(search: EventSearch): [Event]!
  }
`);
