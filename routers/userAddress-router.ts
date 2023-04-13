import { Router } from "express";
const UserAddressController = require("../controller/userAddress-controllers");
import db from "../models";
import authenticate from "../middlewares/auth/authenticate";
import checkExist from "../middlewares/validation/checkExist";
const { User, UserAddress } = db;
const userAddressRouter = Router();

userAddressRouter.post(
  "/add/:id",
  // authenticate,
  checkExist(User),
  UserAddressController.addNewAddressByUserID
);
userAddressRouter.patch(
  "/update/:id",
  //   authenticate,
  checkExist(UserAddress),
  UserAddressController.updateAddressByID
);
userAddressRouter.delete(
  "/delete/:id",
  //   authenticate,
  checkExist(UserAddress),
  UserAddressController.deleteAddressByID
);

export default userAddressRouter;
