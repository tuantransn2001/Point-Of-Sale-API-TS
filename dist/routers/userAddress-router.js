"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserAddressController = require("../controller/userAddress-controllers");
const models_1 = __importDefault(require("../models"));
const middlewares_1 = require("../middlewares");
const { User, UserAddress } = models_1.default;
const userAddressRouter = (0, express_1.Router)();
userAddressRouter.post("/add/:id", middlewares_1.authenticate, (0, middlewares_1.checkExist)(User), UserAddressController.addNewAddressByUserID, middlewares_1.errorMiddleware);
userAddressRouter.patch("/update/:id", middlewares_1.authenticate, (0, middlewares_1.checkExist)(UserAddress), UserAddressController.updateAddressByID, middlewares_1.errorMiddleware);
userAddressRouter.delete("/delete/:id", middlewares_1.authenticate, (0, middlewares_1.checkExist)(UserAddress), UserAddressController.deleteAddressByID, middlewares_1.errorMiddleware);
exports.default = userAddressRouter;
