import express, { Express } from "express";
import config from "config";
import rootRouter from "./routers";
import cors from "cors";
require("dotenv").config();
import {
  USER_ARRAY,
  USER_ADDRESS_LIST_ARRAY,
  CUSTOMER_ARRAY,
  STAFF_ARRAY,
  STAFF_ROLE_ARRAY,
  STAFF_AGENCY_INCHARGE_ARRAY,
  AGENCY_BRANCH_ARRAY,
  ROLE_ARRAY,
  TAG_ARRAY,
  CUSTOMER_TAG_LIST_ARRAY,
  PRICE_ARRAY,
} from "./src/data/seeders";
import db from "./models";
const {
  User,
  Customer,
  UserAddress,
  AgencyBranches,
  Role,
  Staff,
  StaffAgencyBranchInCharge,
  StaffRole,
  Tag,
  CustomerTag,
  Price,
} = db;

const app: Express = express();

const root_url = config.get<string>("root_url");
const port = config.get<string>("port");
const host = config.get<string>("host");

app.use(cors()); // ? Allow cors
app.use(express.json()); // ? Converted Data into JSON type - Important
app.use(root_url, rootRouter); // ? Router Set up

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
        Model: Tag,
        data: TAG_ARRAY,
      },
      {
        Model: CustomerTag,
        data: CUSTOMER_TAG_LIST_ARRAY,
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
      { Model: Price, data: PRICE_ARRAY },
    ].forEach(async ({ Model, data }) => {
      await Model.bulkCreate(data);
    });

    app.listen(port, () => {
      console.log("Connected - Synchronous Database Success");
      console.log(`🚀 Server is running 🚀 - http://${host}:${port}`);
    });
  });
})();
