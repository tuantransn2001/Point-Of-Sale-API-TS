import { Router } from "express";
const UserAddressController = require("../controller/userAddress-controllers");
import db from "../models";
import { authenticate, checkExist, errorMiddleware } from "../middlewares";
const { User, UserAddress } = db;
const userAddressRouter = Router();

userAddressRouter.post(
  "/add/:id",
  authenticate,
  checkExist(User),
  UserAddressController.addNewAddressByUserID,
  errorMiddleware
);
userAddressRouter.patch(
  "/update/:id",
  authenticate,
  checkExist(UserAddress),
  UserAddressController.updateAddressByID,
  errorMiddleware
);
userAddressRouter.delete(
  "/delete/:id",
  authenticate,
  checkExist(UserAddress),
  UserAddressController.deleteAddressByID,
  errorMiddleware
);

export default userAddressRouter;
