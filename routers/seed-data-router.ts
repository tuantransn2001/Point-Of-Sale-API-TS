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
  USER_ARRAY,
  CUSTOMER_ARRAY,
  USER_CUSTOMER_ARRAY,
  CUSTOMER_ADDRESS_LIST_ARRAY,
  USER_STAFF_ARRAY,
  STAFF_ARRAY,
  STAFF_ROLE_ARRAY,
  STAFF_AGENCY_INCHARGE_ARRAY,
  AGENCY_BRANCH_ARRAY,
} from "../src/data/seeders";

const seedRouter = Router();
seedRouter.post("/data-initial", async (req: Request, res: Response) => {
  try {
    const UserSeedList = await Users.bulkCreate(USER_ARRAY);
    const CustomerSeedList = await Customers.bulkCreate(CUSTOMER_ARRAY);
    const UserCustomerSeedList = await UserCustomerList.bulkCreate(
      USER_CUSTOMER_ARRAY
    );
    const CustomerAddressSeedList = await CustomerAddressList.bulkCreate(
      CUSTOMER_ADDRESS_LIST_ARRAY
    );
    const StaffSeedList = await Staffs.bulkCreate(STAFF_ARRAY);
    const StaffRoleSeederList = await StaffRoles.bulkCreate(STAFF_ROLE_ARRAY);
    const StaffAgencyBranchInChargeSeederList =
      await StaffAgencyBranchInCharge.bulkCreate(STAFF_AGENCY_INCHARGE_ARRAY);
    const UserStaffSeederList = await UserStaffList.bulkCreate(
      USER_STAFF_ARRAY
    );
    const AgencyBranchSeedList = await AgencyBranchs.bulkCreate(
      AGENCY_BRANCH_ARRAY
    );
    res.status(201).send({
      status: "success",
      data: {
        UserSeedList,
        CustomerSeedList,
        UserCustomerSeedList,
        CustomerAddressSeedList,
        StaffSeedList,
        StaffRoleSeederList,
        StaffAgencyBranchInChargeSeederList,
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
