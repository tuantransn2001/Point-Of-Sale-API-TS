"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController = require("../controller/auth-controller.js");
const errorHandler_1 = __importDefault(require("../middlewares/errorHandler"));
const authRouter = (0, express_1.Router)();
authRouter.post("/login", AuthController.login, errorHandler_1.default);
exports.default = authRouter;
