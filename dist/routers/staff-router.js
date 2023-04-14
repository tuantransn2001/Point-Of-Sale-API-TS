"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const staffRouter = (0, express_1.Router)();
const StaffController = require("../controller/staff-controller");
const models_1 = __importDefault(require("../models"));
const { User } = models_1.default;
const middlewares_1 = require("../middlewares");
staffRouter.get("/get-all", 
// authenticate,
StaffController.getAll, middlewares_1.errorMiddleware);
staffRouter.post("/create", middlewares_1.authenticate, middlewares_1.authorize, (0, middlewares_1.checkUserExist)(), StaffController.create, middlewares_1.errorMiddleware);
staffRouter.get("/get-by-id/:id", 
// authenticate,
StaffController.getByID, middlewares_1.errorMiddleware);
staffRouter.patch("/update/:id", (0, middlewares_1.checkExist)(User), (0, middlewares_1.checkUserExist)(), 
//   authenticate,
StaffController.updateByID, middlewares_1.errorMiddleware);
staffRouter.delete("/delete-by-id/:id", 
// authenticate,
(0, middlewares_1.checkExist)(User), StaffController.deleteByID, middlewares_1.errorMiddleware);
staffRouter.patch("/update-role-by-id/:id", (0, middlewares_1.checkExist)(User), 
// authenticate,
StaffController.updateRoleByID, middlewares_1.errorMiddleware);
exports.default = staffRouter;
