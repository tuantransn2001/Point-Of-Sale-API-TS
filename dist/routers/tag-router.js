"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TagController = require("../controller/tag-controller");
const middlewares_1 = require("../middlewares");
const models_1 = __importDefault(require("../models"));
const { Tag } = models_1.default;
const tagRouter = (0, express_1.Router)();
tagRouter.get("/get-all", middlewares_1.authenticate, TagController.getAll, middlewares_1.errorMiddleware);
tagRouter.post("/create", middlewares_1.authenticate, TagController.create, middlewares_1.errorMiddleware);
tagRouter.patch("/update-by-id/:id", middlewares_1.authenticate, (0, middlewares_1.checkExist)(Tag), TagController.updateByID, middlewares_1.errorMiddleware);
tagRouter.delete("/delete-by-id/:id", middlewares_1.authenticate, (0, middlewares_1.checkExist)(Tag), TagController.deleteByID, middlewares_1.errorMiddleware);
exports.default = tagRouter;
