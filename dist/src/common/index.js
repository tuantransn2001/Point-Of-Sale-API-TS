"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFormatStaff = exports.randomStringByCharsetAndLength = exports.randomIntFromInterval = exports.handleFormatUpdateDataByValidValue = exports.handleFormatCustomer = exports.handleGetFirstNameFromFullName = void 0;
const randomstring = require("randomstring");
const models_1 = __importDefault(require("../../models"));
const { Role } = models_1.default;
const handleGetFirstNameFromFullName = (fullName) => {
    let targetIndex;
    for (let index = fullName.length - 1; index >= 0; index--) {
        if (fullName[index] === " ") {
            targetIndex = index + 1;
            break;
        }
    }
    return fullName.slice(targetIndex);
};
exports.handleGetFirstNameFromFullName = handleGetFirstNameFromFullName;
const handleFormatCustomer = (UserCustomerArray, // ? isObject if format type === object
AddressArray, formatType) => {
    // ? Handle Case Format Object options
    if (formatType === "isObject") {
        const { id, user_code, user_phone, user_email, user_name, createdAt, updatedAt, } = UserCustomerArray.dataValues;
        const { customer_status, staff_in_charge_note, tags } = UserCustomerArray.dataValues.Customer.dataValues;
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
    let customerResultList;
    customerResultList = UserCustomerArray.map((User) => {
        const { id, user_code, user_phone, user_email, user_name, createdAt, updatedAt, } = User.dataValues;
        const { customer_status, staff_in_charge_note, tags } = User.dataValues.Customer.dataValues;
        return {
            id,
            user_code,
            customer_phone: user_phone,
            customer_email: user_email,
            customer_name: user_name,
            customer_status,
            staff_in_charge_note,
            tags,
            customer_addressList: AddressArray.filter(({ user_id }) => {
                return user_id === id;
            }),
            createdAt,
            updatedAt,
        };
    });
    return customerResultList;
};
exports.handleFormatCustomer = handleFormatCustomer;
const handleFormatUpdateDataByValidValue = (targetObj, defaultValue) => {
    return Object.keys(targetObj).reduce((result, key) => {
        if (defaultValue.hasOwnProperty(key)) {
            result = { ...result, [key]: targetObj[key] };
        }
        return result;
    }, { ...defaultValue, updatedAt: new Date() });
};
exports.handleFormatUpdateDataByValidValue = handleFormatUpdateDataByValidValue;
const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
exports.randomIntFromInterval = randomIntFromInterval;
const randomStringByCharsetAndLength = (charset, length) => {
    return randomstring.generate({
        charset: charset,
        length: length,
    });
};
exports.randomStringByCharsetAndLength = randomStringByCharsetAndLength;
const handleFormatStaff = (userStaffList, formatType) => {
    let staffListResult = [];
    staffListResult = userStaffList.reduce((result, UserStaff) => {
        const { id, user_code, user_phone, user_email, user_password, user_name, createdAt, updatedAt, } = UserStaff.dataValues;
        const { staff_status, staff_birthday, note_about_staff, staff_gender, isAllowViewImportNWholesalePrice, isAllowViewShippingPrice, } = UserStaff.dataValues.Staff;
        const addressList = UserStaff.dataValues.UserAddresses.map(({ id, user_province, user_district, user_specific_address, createdAt, updatedAt, }) => ({
            id,
            user_province,
            user_district,
            user_specific_address,
            createdAt,
            updatedAt,
        }));
        const staffRoleList = UserStaff.Staff.dataValues.StaffRoles.map((StaffRole) => {
            const { id, role_id, createdAt, updatedAt } = StaffRole.dataValues;
            const result = new Object();
            (async () => {
                await Role.findOne({
                    where: {
                        id: role_id,
                    },
                }).then((roleRes) => {
                    result.text = roleRes.dataValues.role_title;
                });
            })();
            return result;
        });
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
exports.handleFormatStaff = handleFormatStaff;
