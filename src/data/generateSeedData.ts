const { v4: uuidv4 } = require("uuid");
import {
  randomStringByCharsetAndLength,
  randomIntFromInterval,
} from "../../src/common";
import { AGENCY_BRANCH_ARRAY, ROLE_ARRAY } from "./seeders";

const USER_ARRAY = [
  {
    id: "27e83e28-b3de-4212-be39-81e61198d77b",
    user_name: "Trần Thái Tuấn",
    user_type: "admin",
    user_phone: "0123456789",
    user_email: "admin@gmail.com",
    user_password: "mhkadmin@123",
    user_code: "UNIT-12",
  },
];
const CUSTOMER_ARRAY = new Array();
const USER_ADDRESS_LIST_ARRAY = new Array();
const CUSTOMER_TAG_LIST_ARRAY = new Array();
const CUSTOMER_ARRAY_LENGTH = 50;

for (let index = 0; index <= CUSTOMER_ARRAY_LENGTH; index++) {
  const randomZeroToThreeNum = randomIntFromInterval(1, 4);

  const newUser = {
    id: uuidv4(),
    user_code: randomStringByCharsetAndLength("alphabetic", 4),
    user_phone: randomStringByCharsetAndLength("numeric", 10),
    user_email: `${randomStringByCharsetAndLength(
      "alphanumeric",
      8
    )}@gmail.com`,
    user_password: randomStringByCharsetAndLength("alphanumeric", 10),
    user_name: `Khách hàng ${randomStringByCharsetAndLength(
      "alphanumeric",
      2
    )}`,
    user_type: "customer",
    isDelete: null,
  };
  const newCustomer = {
    id: uuidv4(),
    user_id: newUser.id,
    customer_status:
      randomZeroToThreeNum === 0 ? "Đang giao dịch" : "Ngừng giao dịch",
    staff_in_charge_note: "Lưu ý về khách hàng sẽ được lưu vào cột này",
    tags: "Shoppe , Tiki",
  };

  for (let index = 0; index <= randomZeroToThreeNum; index++) {
    const newUserAddress = {
      id: uuidv4(),
      user_id: newUser.id,
      user_province: "Thành phố Hồ Chí Minh",
      user_district: `Quận ${randomStringByCharsetAndLength(
        "alphanumeric",
        10
      )}`,
      user_specific_address: `Số nhà ... ${randomStringByCharsetAndLength(
        "alphanumeric",
        10
      )}`,
    };
    USER_ADDRESS_LIST_ARRAY.push(newUserAddress);
   
  }

  CUSTOMER_ARRAY.push(newCustomer);
  USER_ARRAY.push(newUser);
}

const STAFF_ARRAY_LENGTH = 100;
const STAFF_ARRAY = new Array();
const STAFF_ROLE_ARRAY = new Array();
const STAFF_AGENCY_INCHARGE_ARRAY = new Array();
for (
  let index = CUSTOMER_ARRAY_LENGTH + 1;
  index <= STAFF_ARRAY_LENGTH;
  index++
) {
  const randomZeroToThreeNum = randomIntFromInterval(0, 3);
  const randomAmountStaffRole = randomIntFromInterval(1, 3);
  const randomAmountStaffAgencyInCharge = randomIntFromInterval(1, 2);

  const newUser = {
    id: uuidv4(),
    user_code: randomStringByCharsetAndLength("alphabetic", 4),
    user_phone: randomStringByCharsetAndLength("numeric", 10),
    user_email: `${randomStringByCharsetAndLength(
      "alphanumeric",
      8
    )}@gmail.com`,
    user_password: randomStringByCharsetAndLength("alphanumeric", 10),
    user_name: `Nhân viên ${randomStringByCharsetAndLength("alphanumeric", 2)}`,
    user_type: "staff",
    isDelete: null,
  };

  USER_ARRAY.push(newUser);

  const newUserAddress = {
    id: uuidv4(),
    user_id: newUser.id,
    user_province: "Thành phố Hồ Chí Minh",
    user_district: `Quận ${randomStringByCharsetAndLength("alphanumeric", 10)}`,
    user_specific_address: `Số nhà ... ${randomStringByCharsetAndLength(
      "alphanumeric",
      10
    )}`,
  };

  USER_ADDRESS_LIST_ARRAY.push(newUserAddress);

  const newStaff = {
    id: uuidv4(),
    user_id: newUser.id,
    staff_status: randomZeroToThreeNum === 0 ? "Đã nghỉ việc" : "Đang làm việc",
    staff_birthday: new Date(),
    staff_gender: randomZeroToThreeNum === 0 ? false : true,
    note_about_staff: "Những ghi chú về nhân viên sẽ được lưu ở cột này",
    isAllowViewImportNWholesalePrice: randomZeroToThreeNum === 0 ? false : true,
    isAllowViewShippingPrice: randomZeroToThreeNum === 0 ? true : true,
  };

  STAFF_ARRAY.push(newStaff);

  for (let index = 0; index <= randomAmountStaffRole; index++) {
    const randomRoleID = ROLE_ARRAY.map(({ id }: any) => id)[
      randomIntFromInterval(0, ROLE_ARRAY.length - 1)
    ];
    const randomAgencyBranchID = AGENCY_BRANCH_ARRAY.map(({ id }: any) => id)[
      randomIntFromInterval(0, AGENCY_BRANCH_ARRAY.length - 1)
    ];

    const newStaffRole = {
      id: uuidv4(),
      staff_id: newStaff.id,
      role_id: randomRoleID,
    };

    STAFF_ROLE_ARRAY.push(newStaffRole);

    for (let index = 0; index <= randomAmountStaffAgencyInCharge; index++) {
      const newStaffAgencyInCharge = {
        staff_role_id: newStaffRole.id,
        agency_branch_id: randomAgencyBranchID,
      };
      STAFF_AGENCY_INCHARGE_ARRAY.push(newStaffAgencyInCharge);
    }
  }
}

export {
  USER_ARRAY,
  USER_ADDRESS_LIST_ARRAY,
  CUSTOMER_ARRAY,
  STAFF_ARRAY,
  STAFF_ROLE_ARRAY,
  STAFF_AGENCY_INCHARGE_ARRAY,
  CUSTOMER_TAG_LIST_ARRAY,
};
