import {
  AuthenticationError,
  ApolloError,
  SyntaxError,
  ForbiddenError,
  UserInputError,
  ValidationError,
  PersistedQueryNotFoundError,
  PersistedQueryNotSupportedError,
} from "apollo-server-errors";

import { ContractError } from "../validators/index.js";

export default function errorFormatter(err) {
  if (err instanceof ContractError) {
    return new ValidationError(err.message);
  }
  if (err instanceof ApolloError) {
    return err;
  }

  return new ApolloError(err.message);
}
