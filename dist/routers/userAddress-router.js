"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserAddressController = require("../controller/userAddress-controllers");
const models_1 = __importDefault(require("../models"));
const checkExist_1 = __importDefault(require("../middlewares/validation/checkExist"));
const { User, UserAddress } = models_1.default;
const userAddressRouter = (0, express_1.Router)();
userAddressRouter.post("/add/:id", 
// authenticate,
(0, checkExist_1.default)(User), UserAddressController.addNewAddressByUserID);
userAddressRouter.patch("/update/:id", 
//   authenticate,
(0, checkExist_1.default)(UserAddress), UserAddressController.updateAddressByID);
userAddressRouter.delete("/delete/:id", 
//   authenticate,
(0, checkExist_1.default)(UserAddress), UserAddressController.deleteAddressByID);
exports.default = userAddressRouter;
