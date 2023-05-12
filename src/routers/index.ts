import { Router } from "express";
import authRouter from "./auth-router";
import customerRouter from "./customer-router";
import staffRouter from "./staff-router";
import agencyBranchRouter from "./agencyBranch-router";
import userAddressRouter from "./userAddress-router";
import tagRouter from "./tag-router";
import roleRouter from "./role-router";
import priceRouter from "./price-router";
import productRouter from "./product-router";

const rootRouter = Router();

rootRouter
  .use("/auth", authRouter)
  .use("/customer", customerRouter)
  .use("/address", userAddressRouter)
  .use("/agency-branch", agencyBranchRouter)
  .use("/staff", staffRouter)
  .use("/tag", tagRouter)
  .use("/role", roleRouter)
  .use("/price", priceRouter)
  .use("/product", productRouter);

export default rootRouter;
