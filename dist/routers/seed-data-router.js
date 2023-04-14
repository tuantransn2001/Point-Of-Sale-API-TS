"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seedRouter = (0, express_1.Router)();
const { SeedDataController } = require("../controller/seed-data-controller");
seedRouter.post("/start", SeedDataController.start);
seedRouter.delete("/reset", SeedDataController.reset);
exports.default = seedRouter;
