import { Router } from "express";
const agencyBranchRouter = Router();
const AgencyController = require("../controller/agencyBranch-controller");
agencyBranchRouter.get("/get-all", AgencyController.getAll);
agencyBranchRouter.post("/create", AgencyController.create);
agencyBranchRouter.patch("/update-by-id/:id", AgencyController.updateByID);
export default agencyBranchRouter;
