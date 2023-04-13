"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
const { StaffRole, Staff, User, StaffAgencyBranchInCharge, UserAddress } = models_1.default;
const common_1 = require("../src/common");
class StaffController {
    static async getAll(req, res) {
        try {
            const userStaffList = await User.findAll({
                where: {
                    isDelete: null,
                    user_type: "staff",
                },
                include: [
                    {
                        model: Staff,
                        include: [
                            {
                                model: StaffRole,
                                include: [
                                    {
                                        model: StaffAgencyBranchInCharge,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        model: UserAddress,
                    },
                ],
            });
            res.status(200).send({
                status: "success",
                data: (0, common_1.handleFormatStaff)(userStaffList, "isArray"),
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Server is working wrong!");
        }
    }
}
module.exports = StaffController;
