import { gql } from "apollo-server-core";

export default gql(`#graphql
  type Mutation {
		changeConfirmation(guest: GuestEditStatus): Guest
  }
`);
