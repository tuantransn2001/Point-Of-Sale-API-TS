"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ST_A_INCHARGE = exports.ST_ROLE = exports.ST_ARRAY = exports.U_ST_ARRAY = exports.U_ARRAY = void 0;
const randomstring = require("randomstring");
const { v4: uuidv4 } = require("uuid");
const common_1 = require("../../src/common");
const A_B_ARRAY = [
    {
        id: "e7b1d0d2-f2e0-437d-94f4-f3b75cb99e21",
        agency_branch_name: "LCD",
        agency_branch_code: "CN1",
        agency_branch_phone: "0706952905",
        agency_branch_address: "40-42 đường B (Trần Thị Vững), KDC Him Lam Phú Đông, KP Bình Đường 3",
        agency_branch_area: "Bình Dương - Thành phố Dĩ An",
        agency_branch_status: "active",
        isDefaultCN: true,
    },
    {
        id: "6ab4f7c8-353f-47f2-8757-2347f2ab6332",
        agency_branch_name: "BẢO HÀNH",
        agency_branch_code: "CN2",
        agency_branch_phone: "0706952905",
        agency_branch_address: "40-42 đường B (Trần Thị Vững), KDC Him Lam Phú Đông, KP Bình Đường 3",
        agency_branch_area: "Bình Dương - Thành phố Dĩ An",
        agency_branch_status: "active",
        isDefaultCN: false,
    },
    {
        id: "995ea74e-0358-4833-856c-cd45f2e99c21",
        agency_branch_name: "TRUNG TÂM SỬA CHỮA",
        agency_branch_code: "CN2",
        agency_branch_phone: "0706952905",
        agency_branch_address: "40-42 đường B (Trần Thị Vững), KDC Him Lam Phú Đông, KP Bình Đường 3",
        agency_branch_area: "Bình Dương - Thành phố Dĩ An",
        agency_branch_status: "active",
        isDefaultCN: false,
    },
];
const U_ARRAY = [
    {
        id: "27e83e28-b3de-4212-be39-81e61198d77b",
        user_name: "Trần Thái Tuấn",
        user_type: "admin",
        user_phone: "0987546325",
        user_email: "admin@gmail.com",
        user_password: "mhkadmin@123",
        user_code: "ysc1",
    },
];
exports.U_ARRAY = U_ARRAY;
const C_ARRAY = new Array();
const U_C_ARRAY = new Array();
const C_ADDRESS_LIST = new Array();
const C_ARRAY_LENGTH = 51;
const randomAgencyBranchID = () => {
    const randomID = A_B_ARRAY.map(({ id }) => id)[(0, common_1.randomIntFromInterval)(0, 2)];
    return randomID;
};
for (let index = 1; index <= C_ARRAY_LENGTH; index++) {
    const c_number = randomstring.generate({
        charset: "numeric",
        length: 9,
    });
    const c_email = randomstring.generate({
        length: 8,
    });
    const c_code = randomstring.generate({
        charset: "alphanumeric",
        length: 4,
    });
    const newUSer = {
        id: uuidv4(),
        user_name: `Khách hàng ${index}`,
        user_type: "customer",
        user_phone: `0${c_number}`,
        user_email: `${c_email}@gmail.com`,
        user_password: c_email,
        user_code: c_code,
    };
    const newCustomer = {
        id: uuidv4(),
        // TODO: Chưa có dữ liệu nên dùng tạm.
        staff_id: uuidv4(),
        staff_in_charge_note: "Be carefull to change data!",
        customer_status: "Đang giao dịch",
        tags: "Lazada",
    };
    const newUserCustomerItem = {
        id: uuidv4(),
        customer_id: newCustomer.id,
        user_id: newUSer.id,
        user_customer_list_note: "Created by staff",
    };
    const newCAddressItem = {
        id: uuidv4(),
        customer_id: newCustomer.id,
        customer_province: "Hồ Chí Minh",
        customer_district: "Quận Bình Tân",
        customer_address: "Phường 4",
    };
    U_ARRAY.push(newUSer);
    C_ARRAY.push(newCustomer);
    U_C_ARRAY.push(newUserCustomerItem);
    C_ADDRESS_LIST.push(newCAddressItem);
}
const ST_ARRAY_LENGTH = 99;
const ST_ARRAY = new Array();
exports.ST_ARRAY = ST_ARRAY;
const ST_ROLE = new Array();
exports.ST_ROLE = ST_ROLE;
const ST_A_INCHARGE = new Array();
exports.ST_A_INCHARGE = ST_A_INCHARGE;
const U_ST_ARRAY = new Array();
exports.U_ST_ARRAY = U_ST_ARRAY;
for (let index = C_ARRAY_LENGTH + 1; index <= ST_ARRAY_LENGTH + 1; index++) {
    const c_number = randomstring.generate({
        charset: "numeric",
        length: 9,
    });
    const c_email = randomstring.generate({
        length: 8,
    });
    const c_code = randomstring.generate({
        charset: "alphanumeric",
        length: 4,
    });
    const randomRole = randomstring.generate({
        charset: "numeric",
        length: 8,
    });
    const newUSer = {
        id: uuidv4(),
        user_name: `Nhân viên ${index}`,
        user_type: "staff",
        user_phone: `0${c_number}`,
        user_email: `${c_email}@gmail.com`,
        user_password: c_email,
        user_code: c_code,
    };
    const newStaff = {
        id: uuidv4(),
        staff_status: "Đang làm việc",
        staff_birthday: new Date(),
        note_about_staff: "Nhân viên mới",
        staff_gender: "male",
        staff_province: "Hà Nội",
        staff_district: "Quận Tân Bình",
        staff_address: "Phường Linh Trung Quận Thủ Đức",
        isAllowViewImportNWholesalePrice: false,
        isAllowViewShippingPrice: false,
    };
    const userStaffItem = {
        id: uuidv4(),
        staff_id: newStaff.id,
        user_id: newUSer.id,
        user_staff_list_note: "Be carefully",
    };
    const newStaffRole = {
        id: uuidv4(),
        staff_id: newStaff.id,
        staff_role: `Nhân viên ${randomRole}`,
    };
    const PositionAgencyInCharge = {
        id: uuidv4(),
        staff_role_id: newStaffRole.id,
        agency_branch_id: randomAgencyBranchID(),
    };
    U_ARRAY.push(newUSer);
    U_ST_ARRAY.push(userStaffItem);
    ST_ARRAY.push(newStaff);
    ST_ROLE.push(newStaffRole);
    ST_A_INCHARGE.push(PositionAgencyInCharge);
}
