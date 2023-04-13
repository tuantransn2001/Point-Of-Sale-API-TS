"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = __importDefault(require("../models"));
const { Customer, Order, OrderProductList, Role, RolePermission, Staff, StaffAgencyBranchInCharge, StaffRole, User, UserAddress, UserHistoryOrders, AgencyBranchs, AgencyBranchProductItems, OrderProductItems, Products, } = models_1.default;
const generateSeedData_1 = require("../src/data/generateSeedData");
const seedRouter = (0, express_1.Router)();
seedRouter.post("/data-create", async (req, res) => {
    try {
        res.status(201).send({
            status: "success",
            USER_ARRAY: generateSeedData_1.USER_ARRAY,
            USER_ADDRESS_LIST_ARRAY: generateSeedData_1.USER_ADDRESS_LIST_ARRAY,
            CUSTOMER_ARRAY: generateSeedData_1.CUSTOMER_ARRAY,
            STAFF_ARRAY: generateSeedData_1.STAFF_ARRAY,
            STAFF_ROLE_ARRAY: generateSeedData_1.STAFF_ROLE_ARRAY,
            STAFF_AGENCY_INCHARGE_ARRAY: generateSeedData_1.STAFF_AGENCY_INCHARGE_ARRAY,
        });
    }
    catch (err) {
        res.status(500).send({
            status: "Err",
            message: "Server is working wrong!",
        });
    }
});
seedRouter.delete("/data-reset", async (req, res) => {
    try {
        await models_1.default.User.truncate({ cascade: true });
        await models_1.default.Customer.truncate({ cascade: true });
        await models_1.default.UserAddress.truncate({ cascade: true });
        // await db.UserCustomerList.truncate({ cascade: true });
        // await db.Staffs.truncate({ cascade: true });
        // await db.StaffRoles.truncate({ cascade: true });
        // // await db.StaffAgencyBrachInCharge.truncate({ cascade: true });
        // await db.UserStaffList.truncate({ cascade: true });
        res.status(200).send({
            status: "Success",
            message: "Delete All Row Success",
        });
    }
    catch (err) {
        res.status(500).send({
            status: "fail",
            message: "Server is working wrong!",
        });
    }
});
exports.default = seedRouter;
