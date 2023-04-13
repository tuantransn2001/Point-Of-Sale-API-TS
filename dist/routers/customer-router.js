"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CustomerController = require("../controller/customer-controller");
const checkUserExist_1 = __importDefault(require("../middlewares/validation/checkUserExist"));
const checkExist_1 = __importDefault(require("../middlewares/validation/checkExist"));
const models_1 = __importDefault(require("../models"));
const { User, Customers } = models_1.default;
const customerRouter = (0, express_1.Router)();
customerRouter.get("/get-all", 
//  authenticate,
CustomerController.getAll);
customerRouter.get("/get-by-id/:id", 
// authenticate,
(0, checkExist_1.default)(User), CustomerController.getByID);
customerRouter.post("/create", 
// authenticate,
// checkUserExist(),
CustomerController.create);
customerRouter.delete("/delete-by-id/:id", 
// authenticate,
(0, checkExist_1.default)(User), CustomerController.deleteByID);
customerRouter.patch("/update-personalInfo-by-id/:id", 
// authenticate,
(0, checkExist_1.default)(User), (0, checkUserExist_1.default)(), CustomerController.updatePersonalInfoByID);
exports.default = customerRouter;
