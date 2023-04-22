import { Router } from "express";
const priceRouter = Router();
import {
  errorMiddleware,
  checkExist,
  authenticate,
  authorize,
} from "../middlewares";
import db from "../models";
const { Price } = db;
const PriceController = require("../controller/price-controller");

priceRouter.get(
  "/get-all",
  authenticate,
  authorize,
  PriceController.getAll,
  errorMiddleware
);
priceRouter.post(
  "/create",
  authenticate,
  authorize,
  PriceController.create,
  errorMiddleware
);
priceRouter.patch(
  "/update-by-id/:id",
  authenticate,
  authorize,
  checkExist(Price),
  PriceController.checkDefaultPrice,
  PriceController.updateByID,
  errorMiddleware
);
priceRouter.delete(
  "/delete-by-id/:id",
  authenticate,
  authorize,
  checkExist(Price),
  PriceController.checkDefaultPrice,
  PriceController.deleteByID,
  errorMiddleware
);

export default priceRouter;
