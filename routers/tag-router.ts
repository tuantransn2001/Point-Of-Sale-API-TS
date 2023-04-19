import { Router } from "express";
const TagController = require("../controller/tag-controller");
import { errorMiddleware, checkExist, authenticate } from "../middlewares";
import db from "../models";
const { Tag } = db;

const tagRouter = Router();

tagRouter.get("/get-all", authenticate, TagController.getAll, errorMiddleware);
tagRouter.post("/create", authenticate, TagController.create, errorMiddleware);
tagRouter.patch(
  "/update-by-id/:id",
  authenticate,
  checkExist(Tag),
  TagController.updateByID,
  errorMiddleware
);
tagRouter.delete(
  "/delete-by-id/:id",
  authenticate,
  checkExist(Tag),
  TagController.deleteByID,
  errorMiddleware
);

export default tagRouter;
