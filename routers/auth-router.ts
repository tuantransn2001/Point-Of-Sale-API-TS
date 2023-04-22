import { Router } from "express";
const AuthController = require("../controller/auth-controller");
import errorMiddleware from "../middlewares/errorHandler";
const authRouter = Router();

authRouter.post("/login", AuthController.login, errorMiddleware);

export default authRouter;
