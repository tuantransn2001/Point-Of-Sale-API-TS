"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController = require("../controller/auth-controller.js");
const authRouter = (0, express_1.Router)();
authRouter.post("/login", AuthController.login);
exports.default = authRouter;
