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
} from "./seeders";
import db from "../models";
const {
  User,
  Customer,
  UserAddress,
  AgencyBranch,
  Role,
  RolePermission,
  Staff,
  StaffAgencyBranchInCharge,
  StaffRole,
  Tag,
  CustomerTag,
  Price,
} = db;

export const handleSeedData = () => {
  [
    {
      Model: User,
      data: USER_ARRAY,
    },
    {
      Model: Staff,
      data: STAFF_ARRAY,
    },
    {
      Model: Customer,
      data: CUSTOMER_ARRAY,
    },
    {
      Model: Price,
      data: PRICE_ARRAY,
    },
    {
      Model: Tag,
      data: TAG_ARRAY,
    },
    {
      Model: UserAddress,
      data: USER_ADDRESS_LIST_ARRAY,
    },
    {
      Model: CustomerTag,
      data: CUSTOMER_TAG_LIST_ARRAY,
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
  ].forEach(async ({ Model, data }) => {
    await Model.bulkCreate(data);
  });
};

export const handleResetData = () => {
  [
    StaffAgencyBranchInCharge,
    StaffRole,
    Role,
    RolePermission,
    CustomerTag,
    UserAddress,
    Tag,
    AgencyBranch,
    User,
    Price,
    Customer,
    Staff,
  ].forEach(async (Model) => {
    await Model.truncate({ cascade: true });
  });
};
