import "dotenv/config";

import "./src/mongoose.config.js";
import { ApolloServer } from "apollo-server-express";
import { schema, resolvers, scalars } from "./src/graphql/index.js";
import app from "./src/app.js";

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: [resolvers, scalars],
  context: ({ req: { userId } }) => {
    return { userId };
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
  return server;
}

startServer();
