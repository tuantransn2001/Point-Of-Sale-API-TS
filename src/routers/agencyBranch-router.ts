import { Router } from "express";
const agencyBranchRouter = Router();
import AgencyController from "../controller/agencyBranch-controller";
import db from "../models";
const { AgencyBranch } = db;
import {
  authenticate,
  authorize,
  checkExist,
  errorHandler,
} from "../middlewares";

agencyBranchRouter.get(
  "/get-all",
  authenticate,
  authorize,
  AgencyController.getAll,
  errorHandler
);
agencyBranchRouter.post(
  "/create",
  authenticate,
  authorize,
  AgencyController.checkAgencyBranchExistByCode,
  AgencyController.create,
  errorHandler
);
agencyBranchRouter.patch(
  "/update-by-id/:id",
  authenticate,
  authorize,
  checkExist(AgencyBranch),
  AgencyController.checkAgencyBranchExistByCode,
  AgencyController.updateByID,
  errorHandler
);
export default agencyBranchRouter;
