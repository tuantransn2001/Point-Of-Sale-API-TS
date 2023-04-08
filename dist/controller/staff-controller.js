"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
const { UserStaffList, Users, Staffs, StaffAgencyBranchInCharge, StaffRoles, AgencyBranch, } = models_1.default;
// import { handleFormatStaffIncludeCheckIsDelete } from "../src/common";
class StaffController {
    static async getAll(req, res) {
        try {
            const staffList = await UserStaffList.findAll({
                include: [
                    {
                        model: Users,
                    },
                    {
                        model: Staffs,
                    },
                ],
            });
            const staffPRoleIncludeAgencyInChargeList = await StaffAgencyBranchInCharge.findAll({
                include: [
                    {
                        model: StaffRoles,
                    },
                    {
                        model: AgencyBranch,
                    },
                ],
            });
            res.status(200).send({
                status: "success",
                staffPRoleIncludeAgencyInChargeList,
                staffList,
            });
        }
        catch (err) {
            res.status(500).send("Server is working wrong!");
        }
    }
}
module.exports = StaffController;
