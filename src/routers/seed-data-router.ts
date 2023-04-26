import { Router } from "express";
const seedRouter = Router();
import { authenticate, authorize } from "../middlewares";
const { SeedDataController } = require("../controller/seed-data-controller");
seedRouter.post("/start", authenticate, authorize, SeedDataController.start);
seedRouter.delete("/reset", authenticate, authorize, SeedDataController.reset);
export default seedRouter;
