import {
  Address,
  Customer,
  Role,
  StaffAgencyBranchInCharge,
  User,
} from "./type";
const randomstring = require("randomstring");
import db from "../../models";
const { Role } = db;

export const handleGetFirstNameFromFullName = (fullName: string) => {
  let targetIndex: number | undefined;
  for (let index = fullName.length - 1; index >= 0; index--) {
    if (fullName[index] === " ") {
      targetIndex = index + 1;
      break;
    }
  }

  return fullName.slice(targetIndex);
};

interface CustomerResult {
  id?: string;
  user_code?: string;
  customer_status?: string;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  staff_in_charge_note?: string;
  tags?: string;
  customer_addressList?: Array<Address>;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCustomerAttributes {
  dataValues: {
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
    Customer: {
      dataValues: Customer;
    };
  };
  map: any;
}

type UserCustomerParameterType = UserCustomerAttributes &
  Array<UserCustomerAttributes>;

interface AddressAttributes {
  dataValues: {
    id: string;
    user_id: string;
    user_province: string;
    user_district: string;
    user_specific_address: string;
    createdAt: Date;
    updatedAt: Date;
  };
  filter: any;
}

type AddressParameterType = Array<AddressAttributes> | AddressAttributes;

export const handleFormatCustomer = (
  UserCustomerArray: UserCustomerParameterType, // ? isObject if format type === object
  AddressArray: AddressParameterType,
  formatType: string
): Array<CustomerResult> & CustomerResult => {
  // ? Handle Case Format Object options

  if (formatType === "isObject") {
    const {
      id,
      user_code,
      user_phone,
      user_email,
      user_name,
      createdAt,
      updatedAt,
    } = UserCustomerArray.dataValues;
    const { customer_status, staff_in_charge_note, tags } =
      UserCustomerArray.dataValues.Customer.dataValues;

    return {
      id,
      user_code,
      customer_phone: user_phone,
      customer_email: user_email,
      customer_name: user_name,
      customer_status,
      staff_in_charge_note,
      tags,
      customer_addressList: AddressArray,
      createdAt,
      updatedAt,
    };
  }

  let customerResultList: Array<CustomerResult>;
  customerResultList = UserCustomerArray.map((User: UserCustomerAttributes) => {
    const {
      id,
      user_code,
      user_phone,
      user_email,
      user_name,
      createdAt,
      updatedAt,
    } = User.dataValues;
    const { customer_status, staff_in_charge_note, tags } =
      User.dataValues.Customer.dataValues;
    return {
      id,
      user_code,
      customer_phone: user_phone,
      customer_email: user_email,
      customer_name: user_name,
      customer_status,
      staff_in_charge_note,
      tags,
      customer_addressList: AddressArray.filter(({ user_id }: Address) => {
        return user_id === id;
      }),
      createdAt,
      updatedAt,
    };
  });

  return customerResultList;
};

export const handleFormatUpdateDataByValidValue = (
  targetObj: any,
  defaultValue: any
) => {
  return Object.keys(targetObj).reduce(
    (result, key) => {
      if (defaultValue.hasOwnProperty(key)) {
        result = { ...result, [key]: targetObj[key] };
      }

      return result;
    },
    { ...defaultValue, updatedAt: new Date() }
  );
};

export const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomStringByCharsetAndLength = (
  charset: string,
  length: number
): string => {
  return randomstring.generate({
    charset: charset,
    length: length,
  });
};

interface UserStaffListAttributes {
  dataValues: {
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
    Staff: {
      dataValues: {
        id: string;
        user_id: string;
        staff_status: string;
        staff_birthday: Date;
        note_about_staff: string;
        staff_gender: boolean;
        isAllowViewImportNWholesalePrice: boolean;
        isAllowViewShippingPrice: boolean;
        createdAt: Date;
        updatedAt: Date;
        StaffRoles: Array<{
          dataValues: {
            id: string;
            role_id: string;
            staff_id: string;
            createdAt: Date;
            updatedAt: Date;
            StaffAgencyBranchInCharges: Array<{
              dataValues: {
                id: string;
                staff_role_id: string;
                agency_branch_id: string;
                createdAt: Date;
                updatedAt: Date;
              };
            }>;
          };
        }>;
      };
    };
    UserAddresses: Array<{
      dataValues: {
        id: string;
        user_id: string;
        user_province: string;
        user_district: string;
        user_specific_address: string;
        createdAt: Date;
        updatedAt: Date;
      };
    }>;
  };
}

export const handleFormatStaff = (
  userStaffList: Array<UserStaffListAttributes>,
  formatType: string
) => {
  let staffListResult: Array<any> = [];

  staffListResult = userStaffList.reduce((result: any, UserStaff: any) => {
    const {
      id,
      user_code,
      user_phone,
      user_email,
      user_password,
      user_name,
      createdAt,
      updatedAt,
    } = UserStaff.dataValues;

    const {
      staff_status,
      staff_birthday,
      note_about_staff,
      staff_gender,
      isAllowViewImportNWholesalePrice,
      isAllowViewShippingPrice,
    } = UserStaff.dataValues.Staff;

    const addressList = UserStaff.dataValues.UserAddresses.map(
      ({
        id,
        user_province,
        user_district,
        user_specific_address,
        createdAt,
        updatedAt,
      }: any) => ({
        id,
        user_province,
        user_district,
        user_specific_address,
        createdAt,
        updatedAt,
      })
    );

    const staffRoleList = UserStaff.Staff.dataValues.StaffRoles.map(
      (StaffRole: any) => {
        const { id, role_id, createdAt, updatedAt } = StaffRole.dataValues;
        const result: { text?: string } = new Object();
        (async () => {
          await Role.findOne({
            where: {
              id: role_id,
            },
          }).then((roleRes: any) => {
            result.text = roleRes.dataValues.role_title;
          });
        })();

        return result;
      }
    );

    result.push({
      id,
      staff_code: user_code,
      staff_phone: user_phone,
      staff_email: user_email,
      staff_password: user_password,
      staff_name: user_name,
      staff_status,
      staff_birthday,
      note_about_staff,
      staff_gender,
      isAllowViewImportNWholesalePrice,
      isAllowViewShippingPrice,
      createdAt,
      updatedAt,
      addressList,
      staffRoleList,
    });

    return result;
  }, []);

  return staffListResult;
};
