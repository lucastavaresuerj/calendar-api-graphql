import { gql } from "apollo-server-express";

export default gql(`#graphql
  scalar Date
  scalar Confirmation

  type User {
    id: String!
    name: String!
  }

  input UserInput {
    id: String!
  }

  type Guest {
    id: String!
    user: User
    confirmation: Confirmation
  }

  input GuestCreate {
    user: UserInput
    confirmation: Confirmation
  }

  input GuestEdit {
    id: String!
    confirmation: Confirmation!
  }

  type Event {
    id: String!
    begin: Date
    end: Date
    guest: [Guest]
  }

  input EventCreate {
    begin: Date!
    end: Date!
    guest: [GuestCreate]!
  }

  input EventEdit {
    id: String!
    begin: Date
    end: Date
    guest: [GuestEdit]
  }
`);
