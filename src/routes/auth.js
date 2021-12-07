import { Router } from "express";
import * as controler from "../controlers/auth.js";

const route = Router();

route.post("/login", controler.login);
route.post("/signin", controler.signin);
route.post("/logout", controler.logout);

export default route;
