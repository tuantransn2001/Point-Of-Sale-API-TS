import { Router } from "express";
const agencyBranchRouter = Router();
const AgencyController = require("../controller/agencyBranch-controller");
import { authenticate, errorMiddleware } from "../middlewares";

agencyBranchRouter.get("/get-all", AgencyController.getAll, errorMiddleware);
agencyBranchRouter.post("/create", AgencyController.create, errorMiddleware);
agencyBranchRouter.patch(
  "/update-by-id/:id",
  AgencyController.updateByID,
  errorMiddleware
);
export default agencyBranchRouter;
