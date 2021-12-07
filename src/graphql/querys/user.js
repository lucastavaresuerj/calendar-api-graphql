import { gql } from "apollo-server-express";

export default gql(`#graphql
  type Query {
		user(id: String!): User
    users: [User]!
  }
`);
