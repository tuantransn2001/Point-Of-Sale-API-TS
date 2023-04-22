import { Router } from "express";
import authRouter from "./auth-router";
import seedRouter from "./seed-data-router";
import customerRouter from "./customer-router";
import staffRouter from "./staff-router";
import agencyBranchRouter from "./agencyBranch-router";
import userAddressRouter from "./userAddress-router";
import tagRouter from "./tag-router";
import roleRouter from "./role-router";
import priceRouter from "./price-router";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/customer", customerRouter);
rootRouter.use("/address", userAddressRouter);
rootRouter.use("/seed-data", seedRouter);
rootRouter.use("/agency-branch", agencyBranchRouter);
rootRouter.use("/staff", staffRouter);
rootRouter.use("/tag", tagRouter);
rootRouter.use("/role", roleRouter);
rootRouter.use("/price", priceRouter);

export default rootRouter;
