"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STAFF_AGENCY_INCHARGE_ARRAY = exports.STAFF_ROLE_ARRAY = exports.STAFF_ARRAY = exports.CUSTOMER_ARRAY = exports.USER_ADDRESS_LIST_ARRAY = exports.USER_ARRAY = void 0;
const { v4: uuidv4 } = require("uuid");
const common_1 = require("../../src/common");
const seeders_1 = require("./seeders");
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
exports.USER_ARRAY = USER_ARRAY;
const CUSTOMER_ARRAY = new Array();
exports.CUSTOMER_ARRAY = CUSTOMER_ARRAY;
const USER_ADDRESS_LIST_ARRAY = new Array();
exports.USER_ADDRESS_LIST_ARRAY = USER_ADDRESS_LIST_ARRAY;
const CUSTOMER_ARRAY_LENGTH = 50;
for (let index = 0; index <= CUSTOMER_ARRAY_LENGTH; index++) {
    const randomZeroToThreeNum = (0, common_1.randomIntFromInterval)(0, 3);
    const newUser = {
        id: uuidv4(),
        user_code: (0, common_1.randomStringByCharsetAndLength)("alphabetic", 4),
        user_phone: (0, common_1.randomStringByCharsetAndLength)("numeric", 10),
        user_email: `${(0, common_1.randomStringByCharsetAndLength)("alphanumeric", 8)}@gmail.com`,
        user_password: (0, common_1.randomStringByCharsetAndLength)("alphanumeric", 10),
        user_name: `Khách hàng ${(0, common_1.randomStringByCharsetAndLength)("alphanumeric", 2)}`,
        user_type: "customer",
        isDelete: null,
    };
    const newUserAddress = {
        id: uuidv4(),
        user_id: newUser.id,
        user_province: "Thành phố Hồ Chí Minh",
        user_district: `Quận ${(0, common_1.randomStringByCharsetAndLength)("alphanumeric", 10)}`,
        user_specific_address: `Số nhà ... ${(0, common_1.randomStringByCharsetAndLength)("alphanumeric", 10)}`,
    };
    const newCustomer = {
        id: uuidv4(),
        user_id: newUser.id,
        customer_status: randomZeroToThreeNum === 0 ? "Đang giao dịch" : "Ngừng giao dịch",
        staff_in_charge_note: "Lưu ý về khách hàng sẽ được lưu vào cột này",
        tags: "Shoppe , Tiki",
    };
    USER_ARRAY.push(newUser);
    USER_ADDRESS_LIST_ARRAY.push(newUserAddress);
    CUSTOMER_ARRAY.push(newCustomer);
}
const STAFF_ARRAY_LENGTH = 100;
const STAFF_ARRAY = new Array();
exports.STAFF_ARRAY = STAFF_ARRAY;
const STAFF_ROLE_ARRAY = new Array();
exports.STAFF_ROLE_ARRAY = STAFF_ROLE_ARRAY;
const STAFF_AGENCY_INCHARGE_ARRAY = new Array();
exports.STAFF_AGENCY_INCHARGE_ARRAY = STAFF_AGENCY_INCHARGE_ARRAY;
for (let index = CUSTOMER_ARRAY_LENGTH + 1; index <= STAFF_ARRAY_LENGTH; index++) {
    const randomZeroToThreeNum = (0, common_1.randomIntFromInterval)(0, 3);
    const randomAmountStaffRole = (0, common_1.randomIntFromInterval)(1, 3);
    const randomAmountStaffAgencyInCharge = (0, common_1.randomIntFromInterval)(1, 2);
    const newUser = {
        id: uuidv4(),
        user_code: (0, common_1.randomStringByCharsetAndLength)("alphabetic", 4),
        user_phone: (0, common_1.randomStringByCharsetAndLength)("numeric", 10),
        user_email: `${(0, common_1.randomStringByCharsetAndLength)("alphanumeric", 8)}@gmail.com`,
        user_password: (0, common_1.randomStringByCharsetAndLength)("alphanumeric", 10),
        user_name: `Nhân viên ${(0, common_1.randomStringByCharsetAndLength)("alphanumeric", 2)}`,
        user_type: "staff",
        isDelete: null,
    };
    USER_ARRAY.push(newUser);
    const newUserAddress = {
        id: uuidv4(),
        user_id: newUser.id,
        user_province: "Thành phố Hồ Chí Minh",
        user_district: `Quận ${(0, common_1.randomStringByCharsetAndLength)("alphanumeric", 10)}`,
        user_specific_address: `Số nhà ... ${(0, common_1.randomStringByCharsetAndLength)("alphanumeric", 10)}`,
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
        const randomRoleID = seeders_1.ROLE_ARRAY.map(({ id }) => id)[(0, common_1.randomIntFromInterval)(0, seeders_1.ROLE_ARRAY.length - 1)];
        const randomAgencyBranchID = seeders_1.AGENCY_BRANCH_ARRAY.map(({ id }) => id)[(0, common_1.randomIntFromInterval)(0, seeders_1.AGENCY_BRANCH_ARRAY.length - 1)];
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
