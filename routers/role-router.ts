import { Router } from "express";
const RoleController = require("../controller/role-controller");
import { errorMiddleware, checkExist } from "../middlewares";
import db from "../models";
const { Role } = db;

const roleRouter = Router();

roleRouter.get("/get-all", RoleController.getAll, errorMiddleware);
roleRouter.post("/create", RoleController.create, errorMiddleware);
roleRouter.patch(
  "/update-by-id/:id",
  checkExist(Role),
  RoleController.updateByID,
  errorMiddleware
);
roleRouter.delete(
  "/delete-by-id/:id",
  checkExist(Role),
  RoleController.deleteByID,
  errorMiddleware
);

export default roleRouter;
