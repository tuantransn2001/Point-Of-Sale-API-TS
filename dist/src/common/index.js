"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFormatStaff = exports.randomStringByCharsetAndLength = exports.randomIntFromInterval = exports.handleFormatUpdateDataByValidValue = exports.handleFormatCustomer = exports.handleGetFirstNameFromFullName = void 0;
const randomstring = require("randomstring");
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
formatType) => {
    // ? Handle Case Format Object options
    if (formatType === "isObject") {
        const { id, user_code, user_phone, user_email, user_name, createdAt, updatedAt, } = UserCustomerArray.dataValues;
        const { customer_status, staff_in_charge_note, tags } = UserCustomerArray.dataValues.Customer.dataValues;
        const address_list = UserCustomerArray.dataValues.UserAddresses.map((address) => {
            const { id, user_province, user_district, user_specific_address, createdAt, updatedAt, } = address.dataValues;
            return {
                id,
                user_province,
                user_district,
                user_specific_address,
                createdAt,
                updatedAt,
            };
        });
        return {
            id,
            customer_id: UserCustomerArray.dataValues.Customer.dataValues.id,
            user_code,
            customer_phone: user_phone,
            customer_email: user_email,
            customer_name: user_name,
            customer_status,
            staff_in_charge_note,
            tags,
            address_list,
            createdAt,
            updatedAt,
        };
    }
    let customerResultList = new Array();
    customerResultList = UserCustomerArray.map((User) => {
        const { id, user_code, user_phone, user_email, user_name, createdAt, updatedAt, } = User.dataValues;
        const { customer_status, staff_in_charge_note, tags } = User.dataValues.Customer.dataValues;
        const address_list = User.dataValues.UserAddresses.map((address) => {
            const { id, user_province, user_district, user_specific_address, createdAt, updatedAt, } = address.dataValues;
            return {
                id,
                user_province,
                user_district,
                user_specific_address,
                createdAt,
                updatedAt,
            };
        });
        return {
            id,
            user_code,
            customer_id: User.dataValues.Customer.dataValues.id,
            customer_phone: user_phone,
            customer_email: user_email,
            customer_name: user_name,
            customer_status,
            staff_in_charge_note,
            tags,
            address_list,
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
const handleFormatStaff = (userStaffList, roleList, agencyBranchList, formatType) => {
    if (formatType === "isObject") {
        const { id, user_code, user_phone, user_email, user_password, user_name, createdAt, updatedAt, } = userStaffList.dataValues;
        const { staff_status, staff_birthday, note_about_staff, staff_gender, isAllowViewImportNWholesalePrice, isAllowViewShippingPrice, } = userStaffList.dataValues.Staff.dataValues;
        const addressList = userStaffList.dataValues.UserAddresses.map((UserAddress) => {
            const { id, user_province, user_district, user_specific_address, createdAt, updatedAt, } = UserAddress.dataValues;
            return {
                id,
                user_province,
                user_district,
                user_specific_address,
                createdAt,
                updatedAt,
            };
        });
        const staffRoleList = userStaffList.dataValues.Staff.dataValues.StaffRoles.map(
        // TODO: fix
        (StaffRole) => {
            const { id, role_id, createdAt, updatedAt } = StaffRole.dataValues;
            const currentStaffRole = roleList.filter(({ id }) => role_id === id)[0].dataValues.role_title;
            const staffAgencyBranchInCharge = StaffRole.dataValues.StaffAgencyBranchInCharges.map((AgencyInCharge) => {
                const { id, agency_branch_id, createdAt, updatedAt } = AgencyInCharge;
                const currentAgencyBranchName = agencyBranchList.filter(({ id }) => agency_branch_id === id)[0].dataValues.agency_branch_name;
                return {
                    id,
                    createdAt,
                    updatedAt,
                    agency_branch_inCharge_name: currentAgencyBranchName,
                };
            });
            return {
                id,
                createdAt,
                updatedAt,
                role: currentStaffRole,
                agencyBranchesInCharge: staffAgencyBranchInCharge,
            };
        });
        return {
            id,
            staff_id: userStaffList.dataValues.Staff.dataValues.id,
            staff_code: user_code,
            staff_phone: user_phone,
            staff_email: user_email,
            staff_password: user_password,
            staff_name: user_name,
            staff_status,
            staff_birthday,
            note_about_staff,
            staff_gender: staff_gender ? "male" : "female",
            isAllowViewImportNWholesalePrice,
            isAllowViewShippingPrice,
            createdAt,
            updatedAt,
            staffRoleList,
            addressList,
        };
    }
    let staffListResult = new Array();
    staffListResult = userStaffList.reduce((result, UserStaff) => {
        const { id, user_code, user_phone, user_email, user_password, user_name, createdAt, updatedAt, } = UserStaff.dataValues;
        const { staff_status, staff_birthday, note_about_staff, staff_gender, isAllowViewImportNWholesalePrice, isAllowViewShippingPrice, } = UserStaff.dataValues.Staff.dataValues;
        const addressList = UserStaff.dataValues.UserAddresses.map((UserAddress) => {
            const { id, user_province, user_district, user_specific_address, createdAt, updatedAt, } = UserAddress.dataValues;
            return {
                id,
                user_province,
                user_district,
                user_specific_address,
                createdAt,
                updatedAt,
            };
        });
        const staffRoleList = UserStaff.dataValues.Staff.dataValues.StaffRoles.map(
        // TODO: fix
        (StaffRole) => {
            const { id, role_id, createdAt, updatedAt } = StaffRole.dataValues;
            const currentStaffRole = roleList.filter(({ id }) => role_id === id)[0].dataValues.role_title;
            const staffAgencyBranchInCharge = StaffRole.dataValues.StaffAgencyBranchInCharges.map((AgencyInCharge) => {
                const { id, agency_branch_id, createdAt, updatedAt } = AgencyInCharge;
                const currentAgencyBranchName = agencyBranchList.filter(({ id }) => agency_branch_id === id)[0].dataValues.agency_branch_name;
                return {
                    id,
                    createdAt,
                    updatedAt,
                    agency_branch_inCharge_name: currentAgencyBranchName,
                };
            });
            return {
                id,
                createdAt,
                updatedAt,
                role: currentStaffRole,
                agencyBranchesInCharge: staffAgencyBranchInCharge,
            };
        });
        result.push({
            id,
            staff_id: UserStaff.dataValues.Staff.dataValues.id,
            staff_code: user_code,
            staff_phone: user_phone,
            staff_email: user_email,
            staff_password: user_password,
            staff_name: user_name,
            staff_status,
            staff_birthday,
            note_about_staff,
            staff_gender: staff_gender ? "male" : "female",
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
