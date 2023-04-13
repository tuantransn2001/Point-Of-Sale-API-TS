"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { v4: uuidv4 } = require("uuid");
const models_1 = __importDefault(require("../models"));
const { Customer, User, UserAddress } = models_1.default;
const common_1 = require("../src/common");
class CustomerController {
    static async getAll(req, res) {
        try {
            const User_Customer_List = await User.findAll({
                where: {
                    isDelete: null,
                    user_type: "customer",
                },
                include: [
                    {
                        model: Customer,
                    },
                ],
            });
            const User_Address_List = await UserAddress.findAll();
            res.status(200).send({
                status: "success",
                data: (0, common_1.handleFormatCustomer)(User_Customer_List, User_Address_List, "isArray"),
            });
        }
        catch (err) {
            res.status(500).send({
                status: "error",
                message: "Server is working wrong!",
            });
        }
    }
    static async getByID(req, res) {
        try {
            const { id } = req.params; // ? This id is belongs to User
            const foundCustomer = await User.findOne({
                include: [
                    {
                        model: Customer,
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
            if (foundCustomer) {
                const foundCustomerAddressList = await UserAddress.findAll({
                    where: {
                        user_id: id,
                    },
                });
                res.status(200).send({
                    status: "success",
                    data: (0, common_1.handleFormatCustomer)(foundCustomer, foundCustomerAddressList, "isObject"),
                });
            }
            else {
                res.status(404).send({
                    status: "Fail",
                    data: "Customer Not Found",
                });
            }
        }
        catch (err) {
            res.status(500).send({
                status: "fail",
                message: "Server is working wrong!",
            });
        }
    }
    static async create(req, res) {
        try {
            const { user_name, user_code, user_phone, user_email, customer_status, address_list, 
            // TODO: Client provide staff_id with uuid
            staff_id, staff_in_charge_note, tags, } = req.body;
            const userID = uuidv4();
            const newUserRow = {
                id: userID,
                user_code,
                user_phone,
                user_email,
                user_name,
                user_type: "customer",
                isDelete: null,
            };
            const newCustomerRow = {
                user_id: userID,
                // TODO: Add STAFF ID
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
            const newUserCreated = await User.create(newUserRow);
            const newCustomerCreated = await Customer.create(newCustomerRow);
            const newUserAddressListCreated = await UserAddress.bulkCreate(userAddressArray);
            res.status(201).send({
                status: "Success",
                message: "Created successfully!",
                data: {
                    newUserCreated,
                    newCustomerCreated,
                    newUserAddressListCreated,
                },
            });
        }
        catch (err) {
            res
                .status(500)
                .send({ status: "Fail", message: "Server is working wrong!" });
        }
    }
    static async deleteByID(req, res) {
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
            res.status(500).send({
                status: "fail",
                message: "Server is working wrong!",
            });
        }
    }
    static async updatePersonalInfoByID(req, res) {
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
            res.status(500).send({
                status: "error",
                message: "Server is working wrong!",
            });
        }
    }
    static async addNewAddressByCustomerID(req, res) {
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
            res.status(500).send({
                status: "fail",
                message: "Server is working wrong!",
            });
        }
    }
}
module.exports = CustomerController;
