import typesDefinition from "./typesDefinition.js";
import { eventQuery, userQuery } from "./querys/index.js";
import {
  eventResolver,
  userResolver,
  guestResolver,
} from "./resolvers/index.js";
import { eventMutation, guestMutation } from "./mutations/index.js";

import { date, confirmation } from "./scalar-types/index.js";

export const schema = [
  typesDefinition,
  eventQuery,
  eventMutation,
  userQuery,
  guestMutation,
];
export const resolvers = [eventResolver, userResolver, guestResolver];

export const scalars = { ...date, ...confirmation };
