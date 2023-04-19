"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agencyBranchRouter = (0, express_1.Router)();
const models_1 = __importDefault(require("../models"));
const { AgencyBranch } = models_1.default;
const AgencyController = require("../controller/agencyBranch-controller");
const middlewares_1 = require("../middlewares");
agencyBranchRouter.get("/get-all", middlewares_1.authenticate, middlewares_1.authorize, AgencyController.getAll, middlewares_1.errorMiddleware);
agencyBranchRouter.post("/create", middlewares_1.authenticate, middlewares_1.authorize, AgencyController.create, middlewares_1.errorMiddleware);
agencyBranchRouter.patch("/update-by-id/:id", middlewares_1.authenticate, middlewares_1.authorize, (0, middlewares_1.checkExist)(AgencyBranch), AgencyController.updateByID, middlewares_1.errorMiddleware);
exports.default = agencyBranchRouter;
