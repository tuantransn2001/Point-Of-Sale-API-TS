import { Router } from "express";
const RoleController = require("../controller/role-controller");
import {
  errorMiddleware,
  checkExist,
  authorize,
  authenticate,
} from "../middlewares";
import db from "../models";
const { Role } = db;

const roleRouter = Router();

roleRouter.get(
  "/get-all",
  authenticate,
  authorize,
  RoleController.getAll,
  errorMiddleware
);
roleRouter.post(
  "/create",
  authenticate,
  authorize,
  RoleController.create,
  errorMiddleware
);
roleRouter.patch(
  "/update-by-id/:id",
  checkExist(Role),
  authenticate,
  authorize,
  RoleController.updateByID,
  errorMiddleware
);
roleRouter.delete(
  "/delete-by-id/:id",
  checkExist(Role),
  authenticate,
  authorize,
  RoleController.deleteByID,
  errorMiddleware
);

export default roleRouter;
