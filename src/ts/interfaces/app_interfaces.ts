interface AgencyBranchAttributes {
  id: string;
  agency_branch_name: string;
  agency_branch_phone: string;
  agency_branch_code: string;
  agency_branch_address: string;
  agency_branch_area: string;
  agency_branch_expiration_date: string;
  agency_branch_status: string;
  isDefaultCN: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
interface OrderAttributes {
  id: string;
  user_history_order_id: number;
  user_id: string;
  order_tags: string;
  order_status: string;
  order_note: string;
  order_sold_by: string;
  order_sold_at: string;
  order_product_source: string;
  order_code: string;
  order_payment_type: string;
  order_delivery_date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
interface OrderProductItemAttributes {
  id: string;
  order_product_list_id: number;
  order_product_unit: number;
  createdAt?: Date;
  updatedAt?: Date;
}
interface OrderProductListAttributes {
  id: string;
  order_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface UserHistoryOrdersAttributes {
  id: string;
  user_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface RolePermissionAttributes {
  id: string;
  role_id: string;
  role_permission_description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface ProductAttributes {
  id: string;
  order_product_item_id: string;
  agency_branch_product_item_id: string;
  product_name: string;
  product_classify: string;
  product_SKU: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface CustomerAttributes {
  id: string;
  user_id: string;
  staff_id: string | null;
  customer_status: string;
  staff_in_charge_note: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RoleAttributes {
  id: string;
  role_title: string;
  role_description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface StaffAttributes {
  id: string;
  user_id: string;
  staff_status: string;
  staff_birthday: Date;
  note_about_staff: string;
  staff_gender: boolean;
  isAllowViewImportNWholesalePrice: boolean;
  isAllowViewShippingPrice: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface StaffAgencyBranchInChargeAttributes {
  id: string;
  staff_role_id: string;
  agency_branch_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface StaffRoleAttributes {
  id: string;
  role_id: string;
  staff_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface UserAttributes {
  id: string;
  user_code: string;
  user_phone: string;
  user_email: string;
  user_password: string | null;
  user_name: string;
  user_type: string;
  isDelete: boolean | null;
  createdAt?: Date;
  updatedAt?: Date;
}
interface UserAddressAttributes {
  id: string;
  user_id: string;
  user_province: string;
  user_district: string;
  user_specific_address: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface CustomerTagAttributes {
  id: string;
  customer_id: string;
  tag_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TagAttributes {
  id: string;
  tag_title: string;
  tag_description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TypeAttributes {
  id: string;
  type_title: string;
  type_description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BrandAttributes {
  id: string;
  brand_title: string;
  brand_description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface ProductTagItemAttributes {
  id: string;
  tag_id: string;
  addition_product_information_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AdditionProductInformationAttributes {
  id: string;
  product_id: string;
  type_id: string;
  brand_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductVariantDetailAttributes {
  id: string;
  product_id: string;
  product_variant_name: string;
  product_variant_SKU: string;
  product_variant_barcode: string;
  product_weight: string;
  product_weight_calculator_unit: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductVariantPropertyAttributes {
  id: string;
  product_variant_id: string;
  product_variant_property_key: string;
  product_variant_property_value: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductVariantPriceAttributes {
  id: string;
  product_variant_id: string;
  price_id: string;
  price_value: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PriceAttributes {
  id: string;
  price_type: string;
  price_description: string;
  isImportDefault: boolean;
  isSellDefault: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export {
  PriceAttributes,
  ProductVariantPriceAttributes,
  ProductVariantPropertyAttributes,
  ProductVariantDetailAttributes,
  AdditionProductInformationAttributes,
  ProductTagItemAttributes,
  BrandAttributes,
  TypeAttributes,
  TagAttributes,
  CustomerTagAttributes,
  AgencyBranchAttributes,
  OrderAttributes,
  OrderProductItemAttributes,
  OrderProductListAttributes,
  UserHistoryOrdersAttributes,
  RolePermissionAttributes,
  ProductAttributes,
  CustomerAttributes,
  RoleAttributes,
  StaffAttributes,
  StaffAgencyBranchInChargeAttributes,
  StaffRoleAttributes,
  UserAttributes,
  UserAddressAttributes,
};
