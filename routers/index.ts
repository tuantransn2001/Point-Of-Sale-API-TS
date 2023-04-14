import { Router } from "express";
import authRouter from "../routers/auth-router";
import seedRouter from "../routers/seed-data-router";
import customerRouter from "../routers/customer-router";
import staffRouter from "../routers/staff-router";
import agencyBranchRouter from "../routers/agencyBranch-router";
import userAddressRouter from "./userAddress-router";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/customer", customerRouter);
rootRouter.use("/address", userAddressRouter);
rootRouter.use("/seed-data", seedRouter);
rootRouter.use("/agency-branch", agencyBranchRouter);
rootRouter.use("/staff", staffRouter);

export default rootRouter;
