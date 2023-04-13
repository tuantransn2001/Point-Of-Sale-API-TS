"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const staffRouter = (0, express_1.Router)();
const StaffController = require("../controller/staff-controller");
staffRouter.get("/get-all", 
// authenticate,
StaffController.getAll);
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
exports.default = staffRouter;
