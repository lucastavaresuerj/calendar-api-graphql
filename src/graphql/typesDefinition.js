import { gql } from "apollo-server-express";

export default gql(`#graphql
  scalar Date
  scalar Confirmation

  input DateRange {
    begin: Date!
    end: Date!
  }

  type User {
    id: String!
    name: String!
  }

  input UserInput {
    id: String!
  }

  input UserSearch {
    id: String
    name: String
  }

  type Guest {
    user: User
    confirmation: Confirmation
  }

  input GuestInput {
    user: UserInput!
    confirmation: Confirmation!
  }

  # Só quem pode mudar o status do convidado
  # é o próprio convidado, por isso só precisa
  # do evento e confirmação, o id do usuário já
  # vem no token
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

  type Day {
    date: Date!
    events: [Event]!
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
    owner: [UserSearch]
    name: [String]
    begin: Date
    end: Date
    guests: [UserSearch]
  }

  input EventInput {
    id: String!
  }
`);
