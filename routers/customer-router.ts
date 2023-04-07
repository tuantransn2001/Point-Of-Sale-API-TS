import { Router } from "express";
const CustomerController = require("../controller/customer-controller");
import authenticate from "../middlewares/auth/authenticate";
import checkUserExist from "../middlewares/validation/checkUserExist";
import checkExist from "../middlewares/validation/checkExist";
import db from "../models";
const { Customers } = db;

const customerRouter = Router();

customerRouter.get("/get-all", authenticate, CustomerController.getAll);
customerRouter.post(
  "/create",
  authenticate,
  checkUserExist(),
  CustomerController.create
);
customerRouter.get(
  "/get-by-id/:id",
  authenticate,
  checkExist(Customers),
  CustomerController.getByID
);
customerRouter.delete(
  "/delete-by-id/:id",
  authenticate,
  checkExist(Customers),
  CustomerController.deleteByID
);
customerRouter.patch(
  "/update-personalInfo-by-id/:id",
  authenticate,
  checkExist(Customers),
  checkUserExist(),
  CustomerController.updatePersonalInfoByID
);
customerRouter.post(
  "/address/add/:id",
  authenticate,
  checkExist(Customers),
  CustomerController.addNewAddressByCustomerID
);
customerRouter.patch(
  "/address/:addressID/update/:customerID",
  authenticate,
  CustomerController.updateAddressByCustomerIDNAddressID
);
customerRouter.delete(
  "/address/:addressID/delete/:customerID",
  authenticate,
  CustomerController.deleteAddressByCustomerIDNAddressID
);
export default customerRouter;
