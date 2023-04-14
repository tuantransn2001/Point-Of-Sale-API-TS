import { Router, Request, Response } from "express";
const seedRouter = Router();
const { SeedDataController } = require("../controller/seed-data-controller");
seedRouter.post("/start", SeedDataController.start);
seedRouter.delete("/reset", SeedDataController.reset);
export default seedRouter;
