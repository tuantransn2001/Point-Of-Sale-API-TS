"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { v4: uuidv4 } = require("uuid");
const models_1 = __importDefault(require("../models"));
const { Customer, User, UserAddress, CustomerTag, Tag } = models_1.default;
const common_1 = require("../src/common");
class CustomerController {
    static async getAll(req, res, next) {
        try {
            const userCustomerList = await User.findAll({
                where: {
                    isDelete: null,
                    user_type: "customer",
                },
                include: [
                    {
                        model: Customer,
                        include: [
                            {
                                model: CustomerTag,
                                include: [
                                    {
                                        model: Tag,
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
                // userCustomerList,
                data: (0, common_1.handleFormatCustomer)(userCustomerList, "isArray"),
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async getByID(req, res, next) {
        try {
            const { id } = req.params; // ? This id is belongs to User
            const foundCustomer = await User.findOne({
                include: [
                    {
                        model: Customer,
                        where: {
                            user_id: id,
                        },
                        include: [
                            {
                                model: CustomerTag,
                                include: [
                                    {
                                        model: Tag,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        model: UserAddress,
                        where: {
                            user_id: id,
                        },
                    },
                ],
                where: {
                    isDelete: null,
                    user_type: "customer",
                },
            });
            // TODO: Add check address exist or not
            res.status(200).send({
                status: "success",
                data: (0, common_1.handleFormatCustomer)(foundCustomer, "isObject"),
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async create(req, res, next) {
        try {
            const { user_name, user_code, user_phone, user_email, customer_status, address_list, staff_id, staff_in_charge_note, tags, } = req.body;
            const userID = uuidv4();
            const newUserRow = {
                id: userID,
                user_code,
                user_phone,
                user_email,
                user_name,
                user_type: "customer",
                user_password: "",
                isDelete: null,
            };
            const customerID = uuidv4();
            const newCustomerRow = {
                id: customerID,
                user_id: newUserRow.id,
                staff_id,
                staff_in_charge_note,
                tags,
                customer_status,
            };
            const userAddressArray = address_list.map((address) => {
                const { user_province, user_district, user_specific_address } = address;
                const newAddress = {
                    user_id: userID,
                    user_province,
                    user_district,
                    user_specific_address,
                };
                return newAddress;
            });
            if (newUserRow && newCustomerRow && userAddressArray) {
                await User.create(newUserRow);
                await Customer.create(newCustomerRow);
                await UserAddress.bulkCreate(userAddressArray);
                res.status(201).send({
                    status: "Success",
                    message: "Created successfully!",
                });
            }
            else {
                res.status(409).send({
                    status: "Conflict",
                    message: "Create new customer fail - Please check request and try again!",
                });
            }
        }
        catch (err) {
            // TODO: ID Sai
            console.log(err);
            // next(err);
        }
    }
    static async deleteByID(req, res, next) {
        try {
            const { id } = req.params; // ? ID nay la user id
            const foundUser = await User.findByPk(id);
            foundUser.isDelete = true;
            foundUser.save();
            res.status(200).send({
                status: "success",
                message: "Delete customer successfully!",
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async updatePersonalInfoByID(req, res, next) {
        try {
            const { user_code, user_name, user_phone, user_email, customer_status, staff_id, staff_in_charge_note, tags, } = req.body;
            const { id } = req.params;
            const foundUser = await User.findByPk(id);
            const foundCustomer = await Customer.findOne({
                where: {
                    user_id: foundUser.id,
                },
            });
            const userRowUpdated = (0, common_1.handleFormatUpdateDataByValidValue)({
                user_code,
                user_name,
                user_phone,
                user_email,
            }, foundUser.dataValues);
            const customerRowUpdated = (0, common_1.handleFormatUpdateDataByValidValue)({
                customer_status,
                staff_id,
                staff_in_charge_note,
                tags,
            }, foundCustomer.dataValues);
            await User.update(userRowUpdated, {
                where: {
                    id,
                },
            });
            await Customer.update(customerRowUpdated, {
                where: {
                    user_id: foundUser.id,
                },
            });
            res.status(202).send({
                status: "success",
                message: "Update successfully!",
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async addNewAddressByCustomerID(req, res, next) {
        try {
            const { id } = req.params;
            const { user_province, user_district, user_specific_address } = req.body;
            const newAddressRow = {
                user_id: id,
                user_province,
                user_district,
                user_specific_address,
            };
            await UserAddress.create(newAddressRow);
            res.status(201).send({
                status: "success",
                message: "Add new address successfully!",
            });
        }
        catch (err) {
            next(err);
        }
    }
}
module.exports = CustomerController;
