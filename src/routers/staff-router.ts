import { Router } from "express";
const staffRouter = Router();
import StaffController from "../controller/staff-controller";
import db from "../models";
const { User } = db;
import {
  checkExist,
  checkUserExist,
  authenticate,
  authorize,
  errorHandler,
} from "../middlewares";
staffRouter.get("/get-all", authenticate, StaffController.getAll, errorHandler);
staffRouter.post(
  "/create",
  authenticate,
  authorize,
  checkUserExist(),
  StaffController.create,
  errorHandler
);
staffRouter.get(
  "/get-by-id/:id",
  authenticate,
  StaffController.getByID,
  errorHandler
);
staffRouter.patch(
  "/update-by-id/:id",
  authenticate,
  checkExist(User),
  checkUserExist(),
  StaffController.updateByID,
  errorHandler
);
staffRouter.delete(
  "/delete-by-id/:id",
  authenticate,
  checkExist(User),
  StaffController.deleteByID,
  errorHandler
);
staffRouter.patch(
  "/update-role-by-id/:id",
  authenticate,
  checkExist(User),
  StaffController.updateRoleByID,
  errorHandler
);
export default staffRouter;
