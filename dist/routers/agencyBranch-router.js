"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agencyBranchRouter = (0, express_1.Router)();
const AgencyController = require("../controller/agencyBranch-controller");
agencyBranchRouter.get("/get-all", AgencyController.getAll);
agencyBranchRouter.post("/create", AgencyController.create);
agencyBranchRouter.patch("/update-by-id/:id", AgencyController.updateByID);
exports.default = agencyBranchRouter;
