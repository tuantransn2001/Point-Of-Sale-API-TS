import { Router } from "express";
const agencyBranchRouter = Router();
import db from "../models";
const { AgencyBranch } = db;
const AgencyController = require("../controller/agencyBranch-controller");
import {
  authenticate,
  authorize,
  checkExist,
  errorMiddleware,
} from "../middlewares";

agencyBranchRouter.get(
  "/get-all",
  authenticate,
  authorize,
  AgencyController.getAll,
  errorMiddleware
);
agencyBranchRouter.post(
  "/create",
  authenticate,
  authorize,
  AgencyController.create,
  errorMiddleware
);
agencyBranchRouter.patch(
  "/update-by-id/:id",
  authenticate,
  authorize,
  checkExist(AgencyBranch),
  AgencyController.updateByID,
  errorMiddleware
);
export default agencyBranchRouter;
