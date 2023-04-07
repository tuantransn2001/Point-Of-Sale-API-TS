"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = __importDefault(require("../models"));
const { Users, Customers, UserCustomerList, CustomerAddressList, Staffs, StaffRoles, StaffAgencyInCharge, UserStaffList, AgencyBranch, } = models_1.default;
const generateSeedData_1 = require("../src/data/generateSeedData");
const seedRouter = (0, express_1.Router)();
seedRouter.post("/data-initial", async (req, res) => {
    try {
        const UserSeedList = await Users.bulkCreate(generateSeedData_1.U_ARRAY);
        const CustomerSeedList = await Customers.bulkCreate(generateSeedData_1.C_ARRAY);
        const UserCustomerSeedList = await UserCustomerList.bulkCreate(generateSeedData_1.U_C_ARRAY);
        const CustomerAddressSeedList = await CustomerAddressList.bulkCreate(generateSeedData_1.C_ADDRESS_LIST);
        const StaffSeedList = await Staffs.bulkCreate(generateSeedData_1.ST_ARRAY);
        const StaffRoleSeederList = await StaffRoles.bulkCreate(generateSeedData_1.ST_ROLE);
        const StaffAgencyInChargeSeederList = await StaffAgencyInCharge.bulkCreate(generateSeedData_1.ST_A_INCHARGE);
        const UserStaffSeederList = await UserStaffList.bulkCreate(generateSeedData_1.U_ST_ARRAY);
        const AgencyBranchSeedList = await AgencyBranch.bulkCreate(generateSeedData_1.A_B_ARRAY);
        res.status(201).send({
            status: "success",
            data: {
                UserSeedList,
                CustomerSeedList,
                UserCustomerSeedList,
                CustomerAddressSeedList,
                StaffSeedList,
                StaffRoleSeederList,
                StaffAgencyInChargeSeederList,
                UserStaffSeederList,
                AgencyBranchSeedList,
            },
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            status: "Err",
            message: "Server is working wrong!",
        });
    }
});
seedRouter.delete("/data-reset", async (req, res) => {
    try {
        await models_1.default.Users.truncate({ cascade: true });
        await models_1.default.Customers.truncate({ cascade: true });
        await models_1.default.UserCustomerList.truncate({ cascade: true });
        await models_1.default.CustomerAddressList.truncate({ cascade: true });
        await models_1.default.Staffs.truncate({ cascade: true });
        await models_1.default.StaffRoles.truncate({ cascade: true });
        await models_1.default.StaffAgencyInCharge.truncate({ cascade: true });
        await models_1.default.UserStaffList.truncate({ cascade: true });
        res.status(200).send({
            status: "Success",
            message: "Delete All Row Success",
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            status: "fail",
            message: "Server is working wrong!",
        });
    }
});
exports.default = seedRouter;
