import { Router } from "express";
import authRouter from "../routers/auth-router";
import seedRouter from "../routers/seed-data-router";
import customerRouter from "../routers/customer-router";
import staffRouter from "../routers/staff-router";
import agencyBranchRouter from "../routers/agencyBranch-router";
import userAddressRouter from "./userAddress-router";
const rootRouter = Router();

rootRouter.use("/auth", authRouter); // ? => Done
rootRouter.use("/customer", customerRouter); // ? => Done
rootRouter.use("/address", userAddressRouter); // ? => Done
rootRouter.use("/seed", seedRouter); // ? => Done
rootRouter.use("/agency-branch", agencyBranchRouter); // ? => Done
rootRouter.use("/staff", staffRouter); // ! => Developing

export default rootRouter;
