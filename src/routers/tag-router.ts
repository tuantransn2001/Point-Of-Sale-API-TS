import { Router } from "express";
import TagController from "../controller/tag-controller";
import { errorHandler, checkExist, authenticate } from "../middlewares";
import db from "../models";
const { Tag } = db;

const tagRouter = Router();

tagRouter.get("/get-all", authenticate, TagController.getAll, errorHandler);
tagRouter.post("/create", authenticate, TagController.create, errorHandler);
tagRouter.patch(
  "/update-by-id/:id",
  authenticate,
  checkExist(Tag),
  TagController.updateByID,
  errorHandler
);
tagRouter.delete(
  "/delete-by-id/:id",
  authenticate,
  checkExist(Tag),
  TagController.deleteByID,
  errorHandler
);

export default tagRouter;
