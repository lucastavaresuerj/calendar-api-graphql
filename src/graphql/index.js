import typesDefinition from "./typesDefinition.js";
import { eventQuery, userQuery } from "./querys/index.js";
import { eventResolver, userResolver } from "./resolvers/index.js";
// import { userMutation } from "./mutations/index.js";

import { date, confirmation } from "./scalar-types/index.js";

export const schema = [typesDefinition, eventQuery, userQuery];
export const resolvers = [eventResolver, userResolver];

export const scalars = { ...date, ...confirmation };
