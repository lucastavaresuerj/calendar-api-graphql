import express from "express";
import cors from "cors";

import authRoute from "./routes/auth.js";
import { authMiddleware } from "./services/index.js";

const app = express();
app.listen({ port: 4000 }, () =>
  console.log("Server running on http://localhost:4000/")
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/graphql", authMiddleware);

app.use("/auth", authRoute);

app.use((err, req, res, next) => {
  res.send(err);
});

export default app;
