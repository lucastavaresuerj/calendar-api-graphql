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
    guests: [GuestCreate]!
  }

  input EventEdit {
    id: String!
    name: String
    begin: Date
    end: Date
    guests: [GuestEdit]
  }

  input EventSearch {
    id: [String]
    name: [String]
    begin: Date
    end: Date
    guests: [GuestEdit]
  }
`);
