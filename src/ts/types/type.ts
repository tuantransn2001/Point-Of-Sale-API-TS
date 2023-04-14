export interface User {
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

export interface StaffAttributes {
  id?: string;
  user_id?: string;
  staff_status?: string;
  staff_birthday?: Date;
  note_about_staff?: string;
  staff_gender?: boolean;
  isAllowViewImportNWholesalePrice?: boolean;
  isAllowViewShippingPrice?: boolean;
}
export interface Customer {
  id?: string;
  user_id?: string;
  staff_id?: string;
  customer_status?: string;
  staff_in_charge_note?: string;
  tags?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Role {
  id?: string;
  role_title?: string;
  role_description?: string;
}

export interface StaffRoleAttributes {
  id: string;
  role_id: string;
  staff_id: string;
}

export interface StaffAgencyBranchInCharge {
  id?: string;
  staff_role_id?: string;
  agency_branch_id?: string;
}

export interface Address {
  id?: string;
  user_id?: string;
  user_province?: string;
  user_district?: string;
  user_specific_address?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AgencyBranch {
  id?: string;
  agency_branch_name?: string;
  agency_branch_phone?: string;
  agency_branch_code?: string;
  agency_branch_address?: string;
  agency_branch_area?: string;
  agency_branch_status?: string;
  agency_branch_expiration_date?: Date;
  isDefaultCN?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
