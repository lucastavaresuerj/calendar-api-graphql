import { gql } from "apollo-server-express";

export default gql(`#graphql
  type Query {
		event(id: String!): Event
    userEvents: [Event]!
    events(search: EventSearch): [Event]!
  }
`);
