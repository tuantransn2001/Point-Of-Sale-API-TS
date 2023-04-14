"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { v4: uuidv4 } = require("uuid");
const models_1 = __importDefault(require("../models"));
const { StaffRole, Staff, User, StaffAgencyBranchInCharge, Role, UserAddress, AgencyBranches, } = models_1.default;
const common_1 = require("../src/common");
class StaffController {
    static async getAll(req, res, next) {
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
            const roleList = await Role.findAll();
            const agencyBranchList = await AgencyBranches.findAll();
            res.status(200).send({
                status: "success",
                data: (0, common_1.handleFormatStaff)(userStaffList, roleList, agencyBranchList, "isArray"),
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async create(req, res, next) {
        try {
            const { user_phone, user_email, user_password, user_name, staff_birthday, staff_gender, isAllowViewImportNWholesalePrice, isAllowViewShippingPrice, roles, address_list, } = req.body;
            const userID = uuidv4();
            const newUserRow = {
                id: userID,
                user_type: "staff",
                user_code: (0, common_1.randomStringByCharsetAndLength)("alphanumeric", 6),
                user_phone,
                user_email,
                user_password,
                user_name,
                isDelete: null,
            };
            const staffID = uuidv4();
            const newStaffRow = {
                id: staffID,
                user_id: userID,
                staff_status: "Đang giao dịch",
                staff_birthday,
                staff_gender,
                isAllowViewImportNWholesalePrice,
                isAllowViewShippingPrice,
            };
            const { staffRolesRowArr, staffAgencyBranchesInChargeRowArr, } = roles.reduce((result, role) => {
                const { role_id, agencyBranches_inCharge } = role;
                const staffRoleID = uuidv4();
                const newStaffRoleRow = {
                    id: staffRoleID,
                    staff_id: newStaffRow.id,
                    role_id,
                };
                result.staffRolesRowArr.push(newStaffRoleRow);
                agencyBranches_inCharge.forEach((agencyBranchID) => {
                    const newStaffAgencyBranchInCharge = {
                        staff_role_id: newStaffRoleRow.id,
                        agency_branch_id: agencyBranchID,
                    };
                    result.staffAgencyBranchesInChargeRowArr.push(newStaffAgencyBranchInCharge);
                });
                return result;
            }, {
                staffRolesRowArr: [],
                staffAgencyBranchesInChargeRowArr: [],
            });
            const staffAddressRowArr = address_list.map((address) => {
                return {
                    ...address,
                    user_id: userID,
                };
            });
            if (newUserRow &&
                newStaffRow &&
                staffRolesRowArr &&
                staffAgencyBranchesInChargeRowArr &&
                staffAddressRowArr) {
                await User.create(newUserRow);
                await Staff.create(newStaffRow);
                await StaffRole.bulkCreate(staffRolesRowArr);
                await StaffAgencyBranchInCharge.bulkCreate(staffAgencyBranchesInChargeRowArr);
                await UserAddress.bulkCreate(staffAddressRowArr);
                res.status(201).send({
                    status: "Success",
                    message: "Create new staff successfully",
                });
            }
            else {
                res.status(409).send({
                    status: "Fail",
                    message: "Create new staff fail - Please check request and try again!",
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
            const { user_name, user_phone, user_email, staff_birthday, staff_gender, staff_address_list, } = req.body;
            const foundUser = await User.findOne({
                where: {
                    isDelete: null,
                    user_type: "staff",
                    id,
                },
            });
            const userID = foundUser.dataValues.id;
            const foundStaff = await Staff.findOne({
                user_id: userID,
            });
            const staffID = foundStaff.dataValues.id;
            const userRowUpdate = (0, common_1.handleFormatUpdateDataByValidValue)({ user_name, user_phone, user_email }, foundUser.dataValues);
            const staffRowUpdate = (0, common_1.handleFormatUpdateDataByValidValue)({
                staff_birthday,
                staff_gender,
            }, foundStaff.dataValues);
            if (userRowUpdate && staffRowUpdate) {
                await User.update(userRowUpdate, {
                    where: {
                        id: userID,
                    },
                });
                await Staff.update(staffRowUpdate, {
                    where: {
                        id: staffID,
                    },
                });
                // ? Handle modify address list
                const isAddressListEmpty = staff_address_list.length === 0;
                if (isAddressListEmpty) {
                    // ? Dependency empty -> Delete old address
                    await UserAddress.destroy({
                        where: {
                            user_id: userID,
                        },
                    });
                }
                else {
                    // ? Update the new one
                    const staffAddressRowArr = staff_address_list.map((address) => {
                        return {
                            ...address,
                            user_id: userID,
                        };
                    });
                    await UserAddress.destroy({
                        where: {
                            user_id: userID,
                        },
                    });
                    await UserAddress.bulkCreate(staffAddressRowArr);
                }
                res.status(201).send({
                    status: "Success",
                    message: "Create new staff successfully",
                });
            }
            else {
                res.status(409).send({
                    status: "Fail",
                    message: "Update staff fail - Please check request and try again!",
                });
            }
        }
        catch (err) {
            next(err);
        }
    }
    static async deleteByID(req, res, next) {
        try {
            const { id } = req.params; // ? ID nay la user id
            const foundUser = await User.findByPk(id);
            foundUser.isDelete = true;
            foundUser.save();
            res.status(202).send({
                status: "success",
                message: "Delete customer successfully!",
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async updateRoleByID(req, res, next) {
        try {
            const { id } = req.params; // ? This belongs to User
            const { roles } = req.body;
            const foundUserStaff = await User.findOne({
                where: {
                    id,
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
                ],
            });
            const { staffRoleIDArray, staffAgencyBranchInChargeIDArray, } = 
            // TODO: FIX
            foundUserStaff.dataValues.Staff.dataValues.StaffRoles.reduce((result, staffRoleData) => {
                // TODO: fix
                const id = staffRoleData.dataValues.id;
                const staffAgencyInChargeListArr = staffRoleData.dataValues.StaffAgencyBranchInCharges;
                result.staffRoleIDArray.push(id);
                staffAgencyInChargeListArr.forEach((staffAgencyBranch) => {
                    result.staffAgencyBranchInChargeIDArray.push(staffAgencyBranch.dataValues.id);
                });
                return result;
            }, {
                staffRoleIDArray: [],
                staffAgencyBranchInChargeIDArray: [],
            });
            await StaffAgencyBranchInCharge.destroy({
                where: {
                    id: staffAgencyBranchInChargeIDArray,
                },
            });
            await StaffRole.destroy({
                where: {
                    id: staffRoleIDArray,
                },
            });
            const staffID = foundUserStaff.dataValues.Staff.id;
            const { newStaffRoleRowArr, newStaffAgencyBranchInChargeRowArr, } = roles.reduce((result, role) => {
                const { role_id, agencyBranches_inCharge_id_list } = role;
                const staffRoleID = uuidv4();
                result.newStaffRoleRowArr.push({
                    id: staffRoleID,
                    role_id,
                    staff_id: staffID,
                });
                agencyBranches_inCharge_id_list.forEach((agencyBranch_id) => {
                    result.newStaffAgencyBranchInChargeRowArr.push({
                        staff_role_id: staffRoleID,
                        agency_branch_id: agencyBranch_id,
                    });
                });
                return result;
            }, {
                newStaffRoleRowArr: [],
                newStaffAgencyBranchInChargeRowArr: [],
            });
            await StaffRole.bulkCreate(newStaffRoleRowArr);
            await StaffAgencyBranchInCharge.bulkCreate(newStaffAgencyBranchInChargeRowArr);
            res.status(201).send({
                status: "Success",
                message: "Update staff role success!",
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async getByID(req, res, next) {
        try {
            const { id } = req.params;
            const userStaffList = await User.findOne({
                where: {
                    isDelete: null,
                    id,
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
            const roleList = await Role.findAll();
            const agencyBranchList = await AgencyBranches.findAll();
            res.status(200).send({
                status: "success",
                data: (0, common_1.handleFormatStaff)(userStaffList, roleList, agencyBranchList, "isObject"),
            });
        }
        catch (err) {
            next(err);
        }
    }
}
module.exports = StaffController;
