import { Router, Request, Response } from "express";
import db from "../models";
const {
  Users,
  Customers,
  UserCustomerList,
  CustomerAddressList,
  Staffs,
  StaffRoles,
  UserStaffList,
  AgencyBranchs,
  StaffAgencyBranchInCharge,
} = db;
import {
  U_ARRAY,
  U_ST_ARRAY,
  ST_ARRAY,
  ST_ROLE,
  ST_A_INCHARGE,
  AgencyBranch_ARRAY,
} from "../src/data/seeders";

const seedRouter = Router();
seedRouter.post("/data-initial", async (req: Request, res: Response) => {
  try {
    const UserSeedList = await Users.bulkCreate(U_ARRAY);
    // const CustomerSeedList = await Customers.bulkCreate(Customer_ARRAY);
    // const UserCustomerSeedList = await UserCustomerList.bulkCreate(
    //   UserCustomerList_ARRAY
    // );
    // const CustomerAddressSeedList = await CustomerAddressList.bulkCreate(
    //   CustomerAddressList_ARRAY
    // );
    const StaffSeedList = await Staffs.bulkCreate(ST_ARRAY);
    const StaffRoleSeederList = await StaffRoles.bulkCreate(ST_ROLE);
    const StaffAgencyBranchInChargeSeederList =
      await StaffAgencyBranchInCharge.bulkCreate(ST_A_INCHARGE);
    // const UserStaffSeederList = await UserStaffList.bulkCreate(U_ST_ARRAY);
    const AgencyBranchSeedList = await AgencyBranchs.bulkCreate(
      AgencyBranch_ARRAY
    );
    res.status(201).send({
      status: "success",
      data: {
        // UserSeedList,
        // StaffSeedList,
        StaffRoleSeederList,
        StaffAgencyBranchInChargeSeederList,
        // UserStaffSeederList,
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
    // await db.StaffAgencyBrachInCharge.truncate({ cascade: true });
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
