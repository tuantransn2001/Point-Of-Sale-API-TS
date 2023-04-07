export interface User {
  id: string;
  user_code: string;
  user_phone: string;
  user_email: string;
  user_password: string;
  user_name: string;
  user_type: string;
  isDelete: boolean | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface Customer {
  id: string;
  staff_id: string;
  customer_status: string;
  staff_in_charge_note: string;
  tags: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  customer_id: string;
  customer_province: string;
  customer_district: string;
  customer_address: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface UserCustomerTableRowAttributes {
  id: string;
  customer_id: string;
  user_id: string;
  user_customer_list_note: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface UserCustomerItem {
  User: { dataValues: User };
  Customer: { dataValues: Customer };
  dataValues: {
    id: string;
    customer_id: string;
    user_id: string;
    user_customer_list_note: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface AgencyBranchAttributes {
  id: string;
  agency_branch_name: string;
  agency_branch_phone: string;
  agency_branch_code: string;
  agency_branch_address: string;
  agency_branch_area: string;
  agency_branch_expiration_date: Date;
  agency_branch_status: string;
  isDefaultCN: boolean;
  createdAt: Date;
  updatedAt: Date;
}
