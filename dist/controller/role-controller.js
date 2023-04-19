"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
const { Role, StaffRole, StaffAgencyBranchInCharge } = models_1.default;
const { v4: uuidv4 } = require("uuid");
const common_1 = require("../src/common");
class RoleController {
    static async getAll(req, res, next) {
        try {
            const roleList = await Role.findAll();
            res.status(200).send({
                status: "Success",
                data: roleList,
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async create(req, res, next) {
        try {
            const { role_title, role_description } = req.body;
            const foundRole = await Role.findOne({
                where: {
                    role_title,
                },
            });
            if (foundRole) {
                res.status(409).send({
                    status: "Conflict",
                    message: "Role is already exist!",
                });
            }
            else {
                const roleID = uuidv4();
                const newRoleRow = {
                    id: roleID,
                    role_title,
                    role_description,
                };
                await Role.create(newRoleRow);
                res.status(201).send({
                    status: "Success",
                    message: "Create role successfully!",
                });
            }
        }
        catch (err) {
            next(err);
        }
    }
    static async updateByID(req, res, next) {
        try {
            const { id } = req.params;
            const { role_title, role_description } = req.body;
            const foundRole = await Role.findOne({
                where: {
                    id,
                },
            });
            const roleRowUpdate = (0, common_1.handleFormatUpdateDataByValidValue)({
                role_title,
                role_description,
            }, foundRole.dataValues);
            await Role.update(roleRowUpdate, {
                where: {
                    id,
                },
            });
            res.status(202).send({
                status: "Success",
                message: "Update role success",
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async deleteByID(req, res, next) {
        try {
            const { id } = req.params;
            const staffRoleList = await StaffRole.findAll({
                where: {
                    role_id: id,
                },
                include: [
                    {
                        model: StaffAgencyBranchInCharge,
                    },
                ],
            });
            const { staffRoleDeleteRowArr, staffAgencyBrachInChargeRowArr, } = staffRoleList.reduce((result, StaffRoleIncludeStaffAgencyInCharge) => {
                const { id, StaffAgencyBranchInCharges } = StaffRoleIncludeStaffAgencyInCharge.dataValues;
                StaffAgencyBranchInCharges.forEach((StaffAgencyBranchInCharge) => {
                    const { id } = StaffAgencyBranchInCharge.dataValues;
                    result.staffAgencyBrachInChargeRowArr.push(id);
                });
                result.staffRoleDeleteRowArr.push(id);
                return result;
            }, {
                staffRoleDeleteRowArr: [],
                staffAgencyBrachInChargeRowArr: [],
            });
            await Role.destroy({
                where: {
                    id,
                },
            });
            await StaffRole.destroy({
                where: { id: staffRoleDeleteRowArr },
            });
            await StaffAgencyBranchInCharge.destroy({
                where: { id: staffAgencyBrachInChargeRowArr },
            });
            res.status(200).send({
                status: "Success",
                message: "Delete role successfully!",
            });
        }
        catch (err) {
            next(err);
        }
    }
}
module.exports = RoleController;
