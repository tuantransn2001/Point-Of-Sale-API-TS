import { Router, Request, Response } from "express";
import db from "../models";
import handleSeedData from "../controller/seed-data-controller";
const {
  Customer,
  Order,
  OrderProductList,
  Role,
  RolePermission,
  Staff,
  StaffAgencyBranchInCharge,
  StaffRole,
  User,
  UserAddress,
  UserHistoryOrders,
  AgencyBranchs,
  AgencyBranchProductItems,
  OrderProductItems,
  Products,
} = db;

import {
  USER_ARRAY,
  USER_ADDRESS_LIST_ARRAY,
  CUSTOMER_ARRAY,
  STAFF_ARRAY,
  STAFF_ROLE_ARRAY,
  STAFF_AGENCY_INCHARGE_ARRAY,
} from "../src/data/generateSeedData";

const seedRouter = Router();
seedRouter.post("/data-create", async (req: Request, res: Response) => {
  try {
    res.status(201).send({
      status: "success",
      USER_ARRAY,
      USER_ADDRESS_LIST_ARRAY,
      CUSTOMER_ARRAY,
      STAFF_ARRAY,
      STAFF_ROLE_ARRAY,
      STAFF_AGENCY_INCHARGE_ARRAY,
    });
  } catch (err) {
    res.status(500).send({
      status: "Err",
      message: "Server is working wrong!",
    });
  }
});
seedRouter.delete("/data-reset", async (req: Request, res: Response) => {
  try {
    await db.User.truncate({ cascade: true });
    await db.Customer.truncate({ cascade: true });
    await db.UserAddress.truncate({ cascade: true });
    // await db.UserCustomerList.truncate({ cascade: true });
    // await db.Staffs.truncate({ cascade: true });
    // await db.StaffRoles.truncate({ cascade: true });
    // // await db.StaffAgencyBrachInCharge.truncate({ cascade: true });
    // await db.UserStaffList.truncate({ cascade: true });

    res.status(200).send({
      status: "Success",
      message: "Delete All Row Success",
    });
  } catch (err) {
    res.status(500).send({
      status: "fail",
      message: "Server is working wrong!",
    });
  }
});
export default seedRouter;
