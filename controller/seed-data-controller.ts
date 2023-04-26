import { Request, Response } from "express";
import {
  USER_ARRAY,
  USER_ADDRESS_LIST_ARRAY,
  CUSTOMER_ARRAY,
  STAFF_ARRAY,
  STAFF_ROLE_ARRAY,
  STAFF_AGENCY_INCHARGE_ARRAY,
  AGENCY_BRANCH_ARRAY,
  ROLE_ARRAY,
  CUSTOMER_TAG_LIST_ARRAY,
} from "../src/data/seeders";
import db from "../models";
const {
  User,
  Customer,
  UserAddress,
  AgencyBranch,
  Role,
  Staff,
  StaffAgencyBranchInCharge,
  StaffRole,
} = db;

const handleGenerateSeedData = (action: string) => {
  const ModelAndDataSeedArr: Array<{
    Model: any;
    data: any;
  }> = [
    {
      Model: User,
      data: USER_ARRAY,
    },
    {
      Model: Customer,
      data: CUSTOMER_ARRAY,
    },
    {
      Model: Staff,
      data: STAFF_ARRAY,
    },
    {
      Model: UserAddress,
      data: USER_ADDRESS_LIST_ARRAY,
    },
    {
      Model: AgencyBranch,
      data: AGENCY_BRANCH_ARRAY,
    },
    {
      Model: Role,
      data: ROLE_ARRAY,
    },

    {
      Model: StaffRole,
      data: STAFF_ROLE_ARRAY,
    },
    {
      Model: StaffAgencyBranchInCharge,
      data: STAFF_AGENCY_INCHARGE_ARRAY,
    },
  ];
  switch (action) {
    case "start": {
      try {
        ModelAndDataSeedArr.forEach(async ({ Model, data }) => {
          await Model.bulkCreate(data);
        });
      } catch (err) {
        console.log(err);
      }
    }
    case "reset": {
      try {
        ModelAndDataSeedArr.forEach(async ({ Model }) => {
          await Model.destroy({
            truncate: true,
          });
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
};

class SeedDataController {
  public static async start(req: Request, res: Response) {
    // handleGenerateSeedData("start");
    res.status(201).send({
      status: "Success",
      CUSTOMER_TAG_LIST_ARRAY,
      message: "Seed data success",
    });
  }
  public static async reset(req: Request, res: Response) {
    handleGenerateSeedData("reset");
    res.status(201).send({
      status: "Success",
      message: "Reset data success",
    });
  }
}

module.exports = { SeedDataController, handleGenerateSeedData };
