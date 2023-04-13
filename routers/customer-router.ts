import { Router } from "express";
const CustomerController = require("../controller/customer-controller");
import authenticate from "../middlewares/auth/authenticate";
import checkUserExist from "../middlewares/validation/checkUserExist";
import checkExist from "../middlewares/validation/checkExist";
import db from "../models";
const { User, Customers } = db;

const customerRouter = Router();

customerRouter.get(
  "/get-all",
  //  authenticate,
  CustomerController.getAll
);
customerRouter.get(
  "/get-by-id/:id",
  // authenticate,
  checkExist(User),
  CustomerController.getByID
);
customerRouter.post(
  "/create",
  // authenticate,
  // checkUserExist(),
  CustomerController.create
);

customerRouter.delete(
  "/delete-by-id/:id",
  // authenticate,
  checkExist(User),
  CustomerController.deleteByID
);
customerRouter.patch(
  "/update-personalInfo-by-id/:id",
  // authenticate,
  checkExist(User),
  checkUserExist(),
  CustomerController.updatePersonalInfoByID
);

export default customerRouter;
