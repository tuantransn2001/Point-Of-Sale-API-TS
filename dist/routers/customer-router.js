"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CustomerController = require("../controller/customer-controller");
const middlewares_1 = require("../middlewares");
const models_1 = __importDefault(require("../models"));
const { User } = models_1.default;
const customerRouter = (0, express_1.Router)();
customerRouter.get("/get-all", middlewares_1.authenticate, CustomerController.getAll, middlewares_1.errorMiddleware);
customerRouter.get("/get-by-id/:id", middlewares_1.authenticate, (0, middlewares_1.checkExist)(User), CustomerController.getByID, middlewares_1.errorMiddleware);
customerRouter.post("/create", middlewares_1.authenticate, 
// checkUserExist(),
CustomerController.create, middlewares_1.errorMiddleware);
customerRouter.delete("/delete-by-id/:id", middlewares_1.authenticate, (0, middlewares_1.checkExist)(User), CustomerController.deleteByID, middlewares_1.errorMiddleware);
customerRouter.patch("/update-personalInfo-by-id/:id", middlewares_1.authenticate, (0, middlewares_1.checkExist)(User), (0, middlewares_1.checkUserExist)(), CustomerController.updatePersonalInfoByID, middlewares_1.errorMiddleware);
exports.default = customerRouter;
