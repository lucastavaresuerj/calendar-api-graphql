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
    user: User
    confirmation: Confirmation
  }

  input GuestInput {
    user: UserInput!
    confirmation: Confirmation!
  }

  input GuestEditStatus {
    event: EventInput!
    confirmation: Confirmation!
  }

  input GuestUser {
    user: UserInput!
  }

  type Event {
    id: String!
    name: String
    owner: User
    begin: Date
    end: Date
    guests: [Guest]
  }

  input EventCreate {
    name: String!
    begin: Date!
    end: Date!
    guests: [GuestUser]
  }

  input EventEdit {
    id: String!
    name: String
    begin: Date
    end: Date
    guests: [GuestInput]
  }

  input EventSearch {
    id: [String]
    name: [String]
    begin: Date
    end: Date
    guests: [GuestInput]
  }

  input EventInput {
    id: String!
  }

  input EventChangeGuests {
    id: String!
    guests: [GuestUser!]!
  }
`);
