import { Router } from "express";
import UserAddressController from "../controller/userAddress-controllers";
import db from "../models";
import { authenticate, checkExist, errorHandler } from "../middlewares";
const { User, UserAddress } = db;
const userAddressRouter = Router();

userAddressRouter.post(
  "/add/:id",
  authenticate,
  checkExist(User),
  UserAddressController.addNewAddressByUserID,
  errorHandler
);
userAddressRouter.patch(
  "/update/:id",
  authenticate,
  checkExist(UserAddress),
  UserAddressController.updateAddressByID,
  errorHandler
);
userAddressRouter.delete(
  "/delete/:id",
  authenticate,
  checkExist(UserAddress),
  UserAddressController.deleteAddressByID,
  errorHandler
);

export default userAddressRouter;
