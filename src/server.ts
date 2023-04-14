import express, { Express } from "express";
import dotenv from "dotenv";
import rootRouter from "../routers";
import {
  USER_ARRAY,
  USER_ADDRESS_LIST_ARRAY,
  CUSTOMER_ARRAY,
  STAFF_ARRAY,
  STAFF_ROLE_ARRAY,
  STAFF_AGENCY_INCHARGE_ARRAY,
  AGENCY_BRANCH_ARRAY,
  ROLE_ARRAY,
} from "../src/data/seeders";
import db from "../models";
const {
  User,
  Customer,
  UserAddress,
  AgencyBranches,
  Role,
  Staff,
  StaffAgencyBranchInCharge,
  StaffRole,
} = db;

const {
  handleGenerateSeedData,
} = require("../controller/seed-data-controller");

dotenv.config();

const app: Express = express();
const ROOT_URL: string = process.env.BASE_URL ?? "default is string";
const PORT: string = process.env.PORT ?? "default is string";

app.use(express.json()); // ? Converted Data into JSON type - Important
app.use(ROOT_URL, rootRouter); // ? Router Set up

(async () => {
  await db.sequelize.sync({ force: true }).then(() => {
    [
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
        Model: AgencyBranches,
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
    ].forEach(async ({ Model, data }) => {
      await Model.bulkCreate(data);
    });
    app.listen(PORT, () => {
      console.log("Connected - Synchronous Database Success");
      console.log(`Server is running http://localhost:${PORT}`);
    });
  });
})();
