import { GraphQLScalarType, Kind } from "graphql";

export default {
  Confirmation: new GraphQLScalarType({
    name: "Confirmation",
    description: "Confirmation custom scalar type",
    serialize(value) {
      return value; // Convert outgoing Confirmation to JSON value
    },
    parseValue(value) {
      return value; // Convert incoming integer to Any
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.BOOLEAN) {
        return ast.value === "true"; // Convert hard-coded AST string to Boolean
      }
      if (ast.kind === Kind.STRING && ast.value === "awaiting") {
        return ast.value; // Convert hard-coded AST string to "awaiting"
      }
      return null; // Invalid hard-coded value
    },
  }),
};
