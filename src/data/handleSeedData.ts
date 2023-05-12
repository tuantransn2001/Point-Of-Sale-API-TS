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
  BRAND_ARRAY,
  TYPE_ARRAY,
  PRODUCT_ARRAY,
  PRODUCT_TAG_LIST_ARRAY,
  ADDITIONAL_PRODUCT_INFORMATION,
  PRODUCT_VARIANT_DETAIL_ARRAY,
  PRODUCT_VARIANT_PRICE_ARRAY,
  PRODUCT_VARIANT_PROPERTY_ARRAY,
} from "./seeders";
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
  Tag,
  CustomerTag,
  Price,
  Brand,
  Type,
  Products,
  ProductTagList,
  AdditionProductInformation,
  ProductVariantDetail,
  ProductVariantPrice,
  ProductVariantProperty,
} = db;

export const handleSeedData = () => {
  [
    {
      Model: User,
      data: USER_ARRAY,
    },
    {
      Model: Brand,
      data: BRAND_ARRAY,
    },
    {
      Model: Type,
      data: TYPE_ARRAY,
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
      Model: Role,
      data: ROLE_ARRAY,
    },
    {
      Model: AgencyBranch,
      data: AGENCY_BRANCH_ARRAY,
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
      Model: UserAddress,
      data: USER_ADDRESS_LIST_ARRAY,
    },
    {
      Model: CustomerTag,
      data: CUSTOMER_TAG_LIST_ARRAY,
    },

    {
      Model: StaffRole,
      data: STAFF_ROLE_ARRAY,
    },
    {
      Model: StaffAgencyBranchInCharge,
      data: STAFF_AGENCY_INCHARGE_ARRAY,
    },
    {
      Model: Products,
      data: PRODUCT_ARRAY,
    },
    {
      Model: AdditionProductInformation,
      data: ADDITIONAL_PRODUCT_INFORMATION,
    },
    {
      Model: ProductTagList,
      data: PRODUCT_TAG_LIST_ARRAY,
    },
    {
      Model: ProductVariantDetail,
      data: PRODUCT_VARIANT_DETAIL_ARRAY,
    },
    {
      Model: ProductVariantPrice,
      data: PRODUCT_VARIANT_PRICE_ARRAY,
    },
    {
      Model: ProductVariantProperty,
      data: PRODUCT_VARIANT_PROPERTY_ARRAY,
    },
  ].forEach(async ({ Model, data }) => {
    await Model.bulkCreate(data);
  });
};
