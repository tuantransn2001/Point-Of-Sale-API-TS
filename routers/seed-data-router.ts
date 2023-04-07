import { Router, Request, Response } from "express";
import db from "../models";
const {
  Users,
  Customers,
  UserCustomerList,
  CustomerAddressList,
  Staffs,
  StaffRoles,
  StaffAgencyInCharge,
  UserStaffList,
  AgencyBranch,
} = db;
import {
  U_ARRAY,
  C_ARRAY,
  U_C_ARRAY,
  C_ADDRESS_LIST,
  ST_ARRAY,
  ST_ROLE,
  ST_A_INCHARGE,
  U_ST_ARRAY,
  A_B_ARRAY,
} from "../src/data/generateSeedData";
const seedRouter = Router();
seedRouter.post("/data-initial", async (req: Request, res: Response) => {
  try {
    const UserSeedList = await Users.bulkCreate(U_ARRAY);
    const CustomerSeedList = await Customers.bulkCreate(C_ARRAY);
    const UserCustomerSeedList = await UserCustomerList.bulkCreate(U_C_ARRAY);
    const CustomerAddressSeedList = await CustomerAddressList.bulkCreate(
      C_ADDRESS_LIST
    );
    const StaffSeedList = await Staffs.bulkCreate(ST_ARRAY);
    const StaffRoleSeederList = await StaffRoles.bulkCreate(ST_ROLE);
    const StaffAgencyInChargeSeederList = await StaffAgencyInCharge.bulkCreate(
      ST_A_INCHARGE
    );
    const UserStaffSeederList = await UserStaffList.bulkCreate(U_ST_ARRAY);
    const AgencyBranchSeedList = await AgencyBranch.bulkCreate(A_B_ARRAY);
    res.status(201).send({
      status: "success",
      data: {
        UserSeedList,
        CustomerSeedList,
        UserCustomerSeedList,
        CustomerAddressSeedList,
        StaffSeedList,
        StaffRoleSeederList,
        StaffAgencyInChargeSeederList,
        UserStaffSeederList,
        AgencyBranchSeedList,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "Err",
      message: "Server is working wrong!",
    });
  }
});
seedRouter.delete("/data-reset", async (req: Request, res: Response) => {
  try {
    await db.Users.truncate({ cascade: true });
    await db.Customers.truncate({ cascade: true });
    await db.UserCustomerList.truncate({ cascade: true });
    await db.CustomerAddressList.truncate({ cascade: true });
    await db.Staffs.truncate({ cascade: true });
    await db.StaffRoles.truncate({ cascade: true });
    await db.StaffAgencyInCharge.truncate({ cascade: true });
    await db.UserStaffList.truncate({ cascade: true });

    res.status(200).send({
      status: "Success",
      message: "Delete All Row Success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "fail",
      message: "Server is working wrong!",
    });
  }
});
export default seedRouter;
