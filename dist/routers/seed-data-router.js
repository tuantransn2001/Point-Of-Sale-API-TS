"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seedRouter = (0, express_1.Router)();
const middlewares_1 = require("../middlewares");
const { SeedDataController } = require("../controller/seed-data-controller");
seedRouter.post("/start", middlewares_1.authenticate, middlewares_1.authorize, SeedDataController.start);
seedRouter.delete("/reset", middlewares_1.authenticate, middlewares_1.authorize, SeedDataController.reset);
exports.default = seedRouter;
