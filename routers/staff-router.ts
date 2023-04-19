import { Router } from "express";
const staffRouter = Router();
const StaffController = require("../controller/staff-controller");
import db from "../models";
const { User } = db;
import {
  checkExist,
  checkUserExist,
  authenticate,
  authorize,
  errorMiddleware,
} from "../middlewares";
staffRouter.get(
  "/get-all",
  authenticate,
  StaffController.getAll,
  errorMiddleware
);
staffRouter.post(
  "/create",
  authenticate,
  authorize,
  checkUserExist(),
  StaffController.create,
  errorMiddleware
);
staffRouter.get(
  "/get-by-id/:id",
  authenticate,
  StaffController.getByID,
  errorMiddleware
);
staffRouter.patch(
  "/update/:id",
  checkExist(User),
  checkUserExist(),
  // authenticate,
  StaffController.updateByID,
  errorMiddleware
);
staffRouter.delete(
  "/delete-by-id/:id",
  authenticate,
  checkExist(User),
  StaffController.deleteByID,
  errorMiddleware
);
staffRouter.patch(
  "/update-role-by-id/:id",
  checkExist(User),
  authenticate,
  StaffController.updateRoleByID,
  errorMiddleware
);
export default staffRouter;
