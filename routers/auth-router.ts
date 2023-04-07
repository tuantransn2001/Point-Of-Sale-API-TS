import { Router } from "express";
const AuthController = require("../controller/auth-controller.js");
const authRouter = Router();

authRouter.post("/login", AuthController.login);

export default authRouter;
