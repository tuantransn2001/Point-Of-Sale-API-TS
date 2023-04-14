import { Router } from "express";
const CustomerController = require("../controller/customer-controller");
import {
  authenticate,
  checkExist,
  checkUserExist,
  errorMiddleware,
} from "../middlewares";
import db from "../models";
const { User } = db;

const customerRouter = Router();

customerRouter.get(
  "/get-all",
  //  authenticate,
  CustomerController.getAll,
  errorMiddleware
);
customerRouter.get(
  "/get-by-id/:id",
  // authenticate,
  checkExist(User),
  CustomerController.getByID,
  errorMiddleware
);
customerRouter.post(
  "/create",
  // authenticate,
  // checkUserExist(),
  CustomerController.create,
  errorMiddleware
);

customerRouter.delete(
  "/delete-by-id/:id",
  // authenticate,
  checkExist(User),
  CustomerController.deleteByID,
  errorMiddleware
);
customerRouter.patch(
  "/update-personalInfo-by-id/:id",
  // authenticate,
  checkExist(User),
  checkUserExist(),
  CustomerController.updatePersonalInfoByID,
  errorMiddleware
);

export default customerRouter;
