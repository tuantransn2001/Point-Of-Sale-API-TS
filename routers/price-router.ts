import { Router } from "express";
const priceRouter = Router();
import { errorMiddleware } from "../middlewares";
const PriceController = require("../controller/price-controller");

priceRouter.get("/get-all", PriceController.getAll, errorMiddleware);
priceRouter.post("/create", PriceController.create, errorMiddleware);
priceRouter.patch(
  "/update-by-id/:id",
  PriceController.updateByID,
  errorMiddleware
);
priceRouter.delete(
  "/delete-by-id/:id",
  PriceController.deleteByID,
  errorMiddleware
);

export default priceRouter;
