import { UserCustomerItem, Address, User, Customer } from "./type";

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
  id: string;
  staff_id: string;
  customer_status: string;
  customer_name: string;
  customer_code: string;
  customer_phone: string;
  customer_email: string;
  staff_in_charge_note: string;
  tags: string;
  customer_addressList?: Array<{
    id: string;
    customer_province: string;
    customer_district: string;
    customer_address: string;
  }>;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}
export const handleFormatCustomerIncludeCheckIsDelete = (
  customerList: Array<UserCustomerItem>,
  addressList: Array<Address>,
  formatType: string
) => {
  const customerListCopy: Array<UserCustomerItem> = [...customerList];

  switch (formatType) {
    case "isArray": {
      return customerListCopy.reduce(
        (result: Array<CustomerResult>, customerItem: UserCustomerItem) => {
          const {
            user_code,
            user_phone,
            user_email,
            user_name,
            isDelete,
          }: User = customerItem.User.dataValues;
          const {
            id,
            staff_id,
            customer_status,
            staff_in_charge_note,
            tags,
            createdAt,
            updatedAt,
          }: Customer = customerItem.Customer.dataValues;

          if (!isDelete) {
            const addressListResult = addressList
              .filter((item) => item.customer_id === id)
              .map(
                ({
                  id,
                  customer_province,
                  customer_district,
                  customer_address,
                }: Address) => {
                  return {
                    id,
                    customer_province,
                    customer_district,
                    customer_address,
                  };
                }
              );

            const newCustomerRowResult: CustomerResult = {
              id,
              staff_id,
              customer_status,
              customer_name: user_name,
              customer_code: user_code,
              customer_phone: user_phone,
              customer_email: user_email,
              customer_addressList: addressListResult,
              staff_in_charge_note,
              tags,
              createdAt,
              updatedAt,
            };

            result.push(newCustomerRowResult);
          }

          return result;
        },
        []
      );
    }
    case "isObject": {
      const { user_code, user_phone, user_email, user_name, isDelete }: User =
        customerList[0].User.dataValues;
      const {
        id,
        staff_id,
        customer_status,
        staff_in_charge_note,
        tags,
        createdAt,
        updatedAt,
      }: Customer = customerList[0].Customer.dataValues;

      if (!isDelete) {
        const addressListResult = addressList
          .filter((item) => item.customer_id === id)
          .map(
            ({
              id,
              customer_province,
              customer_district,
              customer_address,
            }: Address) => {
              return {
                id,
                customer_province,
                customer_district,
                customer_address,
              };
            }
          );

        const newCustomerRowResult: CustomerResult = {
          id,
          staff_id,
          customer_status,
          customer_name: user_name,
          customer_code: user_code,
          customer_phone: user_phone,
          customer_email: user_email,
          customer_addressList: addressListResult,
          staff_in_charge_note,
          tags,
          createdAt,
          updatedAt,
        };
        return newCustomerRowResult;
      }
    }
  }
};

interface StaffResult {}
export const handleFormatStaffIncludeCheckIsDelete = (
  customerList: Array<string>
) => {};

export const handleFormatUpdateDataByValidValue = (
  targetObj: any,
  defaultValue: any
) => {
  return Object.keys(targetObj).reduce(
    (result, key) => {
      console.log(key, targetObj[key]);
      if (defaultValue.hasOwnProperty(key)) {
        result = { ...result, [key]: targetObj[key] };
      }

      return result;
    },
    { ...defaultValue, updatedAt: new Date() }
  );
};

export const randomIntFromInterval = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};
