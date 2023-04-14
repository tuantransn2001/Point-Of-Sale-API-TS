interface AgencyBranchAttributes {
  id?: string;
  agency_branch_name?: string;
  agency_branch_phone?: string;
  agency_branch_code?: string;
  agency_branch_address?: string;
  agency_branch_area?: string;
  agency_branch_expiration_date?: string;
  agency_branch_status?: string;
  isDefaultCN?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
interface OrderAttributes {
  id?: string;
  user_history_order_id?: number;
  user_id?: string;
  order_tags?: string;
  order_status?: string;
  order_note?: string;
  order_sold_by?: string;
  order_sold_at?: string;
  order_product_source?: string;
  order_code?: string;
  order_payment_type?: string;
  order_delivery_date?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
interface OrderProductItemAttributes {
  id?: string;
  order_product_list_id?: number;
  order_product_unit?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
interface OrderProductListAttributes {
  id?: string;
  order_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface UserHistoryOrdersAttributes {
  id?: string;
  user_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface RolePermissionAttributes {
  id?: string;
  role_id?: string;
  role_permission_description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface ProductAttributes {
  id?: string;
  order_product_item_id?: string;
  agency_branch_product_item_id?: string;
  product_name?: string;
  product_image?: string;
  product_sku?: string;
  product_barcode?: string;
  product_weight?: string;
  product_unit_type?: string;
  product_classify?: string;
  product_type?: string;
  product_branch?: string;
  product_tags?: string;
  product_retail_price?: string;
  product_shopee_price?: string;
  product_price_sell_over_10m?: string;
  product_price_sell_under_10m?: string;
  product_warranty?: string;
  product_wholesale_price?: string;
  product_import_price?: string;
  product_import_shopee_price?: string;
  product_sell_status?: string;
  product_inventory?: number;
  product_can_be_sold?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
interface AgencyBranchProductItemAttributes {
  id?: string;
  agency_product_id?: number;
  agency_branch_product_name?: string;
  agency_branch_product_inventory?: number;
  agency_branch_product_cost_price?: string;
  agency_branch_product_amount_can_be_sold?: number;
  agency_branch_product_amount_being_traded?: number;
  agency_branch_product_amount_importing?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CustomerAttributes {
  id?: string;
  user_id?: string;
  staff_id?: string;
  customer_status?: string;
  staff_in_charge_note?: string;
  tags?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RoleAttributes {
  id?: string;
  role_title?: string;
  role_description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface StaffAttributes {
  id?: string;
  user_id?: string;
  staff_status?: string;
  staff_birthday?: Date;
  note_about_staff?: string;
  staff_gender?: boolean;
  isAllowViewImportNWholesalePrice?: boolean;
  isAllowViewShippingPrice?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface StaffAgencyBranchInChargeAttributes {
  id?: string;
  staff_role_id?: string;
  agency_branch_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface StaffRoleAttributes {
  id?: string;
  role_id?: string;
  staff_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface UserAttributes {
  id?: string;
  user_code?: string;
  user_phone?: string;
  user_email?: string;
  user_password?: string;
  user_name?: string;
  user_type?: string;
  isDelete?: boolean | null;
  createdAt?: Date;
  updatedAt?: Date;
}
interface UserAddressAttributes {
  id?: string;
  user_id?: string;
  user_province?: string;
  user_district?: string;
  user_specific_address?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export {
  AgencyBranchAttributes,
  OrderAttributes,
  OrderProductItemAttributes,
  OrderProductListAttributes,
  UserHistoryOrdersAttributes,
  RolePermissionAttributes,
  ProductAttributes,
  AgencyBranchProductItemAttributes,
  CustomerAttributes,
  RoleAttributes,
  StaffAttributes,
  StaffAgencyBranchInChargeAttributes,
  StaffRoleAttributes,
  UserAttributes,
  UserAddressAttributes,
};
