import { Router } from "express";
const staffRouter = Router();
const StaffController = require("../controller/staff-controller");
import authenticate from "../middlewares/auth/authenticate";

staffRouter.get("/get-all", authenticate, StaffController.getAll);
// staffRouter.get("/get-by-id/:id", authenticate, StaffController.getByID);
// staffRouter.post(
//   "/create",
//   authenticate,
//   checkUserExist(),
//   StaffController.create
// );
// staffRouter.patch(
//   "/update/:id",
//   checkExist(Staffs),
//   checkUserExist(),
//   authenticate,
//   StaffController.updateByID
// );
// staffRouter.delete(
//   "/delete-by-id/:id",
//   authenticate,
//   checkExist(Staffs),
//   StaffController.deleteByID
// );
// staffRouter.patch(
//   "/update-role-by-id/:id",
//   checkExist(Staffs),
//   authenticate,
//   StaffController.updateRoleByStaffIDAndPositionID
// );
export default staffRouter;
