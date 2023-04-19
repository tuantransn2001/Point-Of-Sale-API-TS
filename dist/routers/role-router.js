"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RoleController = require("../controller/role-controller");
const middlewares_1 = require("../middlewares");
const models_1 = __importDefault(require("../models"));
const { Role } = models_1.default;
const roleRouter = (0, express_1.Router)();
roleRouter.get("/get-all", RoleController.getAll, middlewares_1.errorMiddleware);
roleRouter.post("/create", RoleController.create, middlewares_1.errorMiddleware);
roleRouter.patch("/update-by-id/:id", (0, middlewares_1.checkExist)(Role), RoleController.updateByID, middlewares_1.errorMiddleware);
roleRouter.delete("/delete-by-id/:id", (0, middlewares_1.checkExist)(Role), RoleController.deleteByID, middlewares_1.errorMiddleware);
exports.default = roleRouter;
