import { Router } from "express";
const priceRouter = Router();
import { errorMiddleware, checkExist } from "../middlewares";
import db from "../models";
const { Price } = db;
const PriceController = require("../controller/price-controller");

priceRouter.get("/get-all", PriceController.getAll, errorMiddleware);
priceRouter.post("/create", PriceController.create, errorMiddleware);
priceRouter.patch(
  "/update-by-id/:id",
  checkExist(Price),
  PriceController.checkDefaultPrice,
  PriceController.updateByID,
  errorMiddleware
);
priceRouter.delete(
  "/delete-by-id/:id",
  checkExist(Price),
  PriceController.checkDefaultPrice,
  PriceController.deleteByID,
  errorMiddleware
);

export default priceRouter;
