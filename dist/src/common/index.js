"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomIntFromInterval = exports.handleFormatUpdateDataByValidValue = exports.handleFormatStaffIncludeCheckIsDelete = exports.handleFormatCustomerIncludeCheckIsDelete = exports.handleGetFirstNameFromFullName = void 0;
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
const handleFormatCustomerIncludeCheckIsDelete = (customerList, addressList, formatType) => {
    const customerListCopy = [...customerList];
    switch (formatType) {
        case "isArray": {
            return customerListCopy.reduce((result, customerItem) => {
                const { user_code, user_phone, user_email, user_name, isDelete, } = customerItem.User.dataValues;
                const { id, staff_id, customer_status, staff_in_charge_note, tags, createdAt, updatedAt, } = customerItem.Customer.dataValues;
                if (!isDelete) {
                    const addressListResult = addressList
                        .filter((item) => item.customer_id === id)
                        .map(({ id, customer_province, customer_district, customer_address, }) => {
                        return {
                            id,
                            customer_province,
                            customer_district,
                            customer_address,
                        };
                    });
                    const newCustomerRowResult = {
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
            }, []);
        }
        case "isObject": {
            const { user_code, user_phone, user_email, user_name, isDelete } = customerList[0].User.dataValues;
            const { id, staff_id, customer_status, staff_in_charge_note, tags, createdAt, updatedAt, } = customerList[0].Customer.dataValues;
            if (!isDelete) {
                const addressListResult = addressList
                    .filter((item) => item.customer_id === id)
                    .map(({ id, customer_province, customer_district, customer_address, }) => {
                    return {
                        id,
                        customer_province,
                        customer_district,
                        customer_address,
                    };
                });
                const newCustomerRowResult = {
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
exports.handleFormatCustomerIncludeCheckIsDelete = handleFormatCustomerIncludeCheckIsDelete;
const handleFormatStaffIncludeCheckIsDelete = (customerList) => { };
exports.handleFormatStaffIncludeCheckIsDelete = handleFormatStaffIncludeCheckIsDelete;
const handleFormatUpdateDataByValidValue = (targetObj, defaultValue) => {
    return Object.keys(targetObj).reduce((result, key) => {
        console.log(key, targetObj[key]);
        if (defaultValue.hasOwnProperty(key)) {
            result = { ...result, [key]: targetObj[key] };
        }
        return result;
    }, { ...defaultValue, updatedAt: new Date() });
};
exports.handleFormatUpdateDataByValidValue = handleFormatUpdateDataByValidValue;
const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
};
exports.randomIntFromInterval = randomIntFromInterval;
