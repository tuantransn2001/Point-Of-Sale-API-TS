"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seeders_1 = require("../src/data/seeders");
const models_1 = __importDefault(require("../models"));
const { User, Customer, UserAddress, AgencyBranches, Role, Staff, StaffAgencyBranchInCharge, StaffRole, } = models_1.default;
const handleGenerateSeedData = (action) => {
    const ModelAndDataSeedArr = [
        {
            Model: User,
            data: seeders_1.USER_ARRAY,
        },
        {
            Model: Customer,
            data: seeders_1.CUSTOMER_ARRAY,
        },
        {
            Model: Staff,
            data: seeders_1.STAFF_ARRAY,
        },
        {
            Model: UserAddress,
            data: seeders_1.USER_ADDRESS_LIST_ARRAY,
        },
        {
            Model: AgencyBranches,
            data: seeders_1.AGENCY_BRANCH_ARRAY,
        },
        {
            Model: Role,
            data: seeders_1.ROLE_ARRAY,
        },
        {
            Model: StaffRole,
            data: seeders_1.STAFF_ROLE_ARRAY,
        },
        {
            Model: StaffAgencyBranchInCharge,
            data: seeders_1.STAFF_AGENCY_INCHARGE_ARRAY,
        },
    ];
    switch (action) {
        case "start": {
            try {
                ModelAndDataSeedArr.forEach(async ({ Model, data }) => {
                    await Model.bulkCreate(data);
                });
            }
            catch (err) {
                console.log(err);
            }
        }
        case "reset": {
            try {
                ModelAndDataSeedArr.forEach(async ({ Model }) => {
                    await Model.destroy({
                        truncate: true,
                    });
                });
            }
            catch (err) {
                console.log(err);
            }
        }
    }
};
class SeedDataController {
    static async start(req, res) {
        handleGenerateSeedData("start");
        res.status(201).send({
            status: "Success",
            message: "Seed data success",
        });
    }
    static async reset(req, res) {
        handleGenerateSeedData("reset");
        res.status(201).send({
            status: "Success",
            message: "Reset data success",
        });
    }
}
module.exports = { SeedDataController, handleGenerateSeedData };
