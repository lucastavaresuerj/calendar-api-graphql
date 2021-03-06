import { GraphQLScalarType, Kind } from "graphql";

export default {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    serialize(value) {
      if (value instanceof Date) {
        return value.toISOString(); // Convert outgoing Date to integer for JSON
      }
      return value;
    },
    parseValue(value) {
      return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
      }
      if (ast.kind === Kind.STRING) {
        return new Date(value); // Convert hard-coded AST string to Date
      }
      return null; // Invalid hard-coded value (not an integer)
    },
  }),
};
