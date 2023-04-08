"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { v4: uuidv4 } = require("uuid");
const models_1 = __importDefault(require("../models"));
const common_1 = require("../src/common");
const { Users, Customers, UserCustomerList, CustomerAddressList } = models_1.default;
class CustomerController {
    static async getAll(req, res) {
        try {
            const customerList = await UserCustomerList.findAll({
                include: [
                    {
                        model: Users,
                    },
                    {
                        model: Customers,
                    },
                ],
            });
            const customerAddressList = await CustomerAddressList.findAll();
            res.status(200).send({
                status: "success",
                data: (0, common_1.handleFormatCustomerIncludeCheckIsDelete)(customerList, customerAddressList, "isArray"),
            });
        }
        catch (err) {
            res.status(500).send({
                status: "error",
                message: "Server is working wrong!",
                error: err,
            });
        }
    }
    static async create(req, res) {
        try {
            const { user_name, user_code, user_phone, user_email, customer_status, customer_province, customer_district, customer_address, 
            // TODO: Client provide staff_id with uuid
            staff_id, staff_in_charge_note, tags, } = req.body;
            const newUserRow = await Users.create({
                user_name,
                user_code,
                user_phone,
                user_email,
                isDelete: null,
                user_type: "customer",
            });
            const newCustomerRow = await Customers.create({
                staff_id: uuidv4(),
                staff_in_charge_note,
                customer_status,
                tags,
            });
            await UserCustomerList.create({
                customer_id: newCustomerRow.dataValues.id,
                user_id: newUserRow.dataValues.id,
            });
            await CustomerAddressList.create({
                customer_id: newCustomerRow.dataValues.id,
                customer_province,
                customer_district,
                customer_address,
            });
            res
                .status(201)
                .send({ status: "Success", message: "Created successfully!" });
        }
        catch (err) {
            res
                .status(500)
                .send({ status: "Fail", message: "Server is working wrong!" });
        }
    }
    static async getByID(req, res) {
        try {
            const { id } = req.params;
            const foundCustomerList = await UserCustomerList.findAll({
                include: [
                    {
                        model: Users,
                    },
                    {
                        model: Customers,
                    },
                ],
                where: {
                    customer_id: id,
                },
            });
            // TODO: Add check address exist or not
            const isUserExist = foundCustomerList[0].dataValues.User.dataValues.isDelete === null;
            console.log(isUserExist);
            const customerAddressList = await CustomerAddressList.findAll();
            if (isUserExist) {
                res.status(200).send({
                    status: "success",
                    data: (0, common_1.handleFormatCustomerIncludeCheckIsDelete)(foundCustomerList, customerAddressList, "isObject"),
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
    static async deleteByID(req, res) {
        try {
            const { id } = req.params;
            // ? Trường hợp khi xóa rồi -> isDelete = true -> Nếu nhập lại id này thì sẽ fake thông báo ( client xử lý )
            const foundCustomerList = await UserCustomerList.findAll({
                include: [
                    {
                        model: Users,
                    },
                    {
                        model: Customers,
                    },
                ],
                where: {
                    customer_id: id,
                },
            });
            const targetUserID = foundCustomerList[0].User.dataValues.id;
            const foundUser = await Users.findOne({
                where: {
                    id: targetUserID,
                },
            });
            foundUser.isDelete = true;
            await foundUser.save();
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
            const { user_id, customer_id } = await UserCustomerList.findOne({
                where: {
                    customer_id: id,
                },
            });
            const foundUserByID = await Users.findOne({
                where: {
                    id: user_id,
                },
            });
            const foundCustomerByID = await Customers.findOne({
                where: {
                    id: customer_id,
                },
            });
            const newUserRowUpdate = (0, common_1.handleFormatUpdateDataByValidValue)({
                user_code,
                user_name,
                user_phone,
                user_email,
            }, foundUserByID.dataValues);
            // TODO: Fix random StaffID
            // const handleRandomStaffID = () => {
            //   const staffSeedArrayLength: number = StaffSeedArray.length;
            //   const randomStaffID: string = StaffSeedArray.map(({ id }) => id)[
            //     randomIntFromInterval(0, staffSeedArrayLength - 1)
            //   ];
            //   return randomStaffID;
            // };
            const newCustomerRowUpdate = (0, common_1.handleFormatUpdateDataByValidValue)({
                customer_status,
                // staff_id: handleRandomStaffID(),
                staff_in_charge_note,
                tags,
            }, foundCustomerByID.dataValues);
            const UserUpdated = await foundUserByID.update(newUserRowUpdate);
            const CustomerUpdated = await foundCustomerByID.update(newCustomerRowUpdate);
            res.status(202).send({
                status: "success",
                message: "Update successfully!",
                data: {
                    user: {
                        prev: foundUserByID,
                        updated: UserUpdated,
                    },
                    customer: {
                        prev: foundCustomerByID,
                        updated: CustomerUpdated,
                    },
                },
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
            const { customer_province, customer_district, customer_address } = req.body;
            const newAddressRow = {
                customer_province,
                customer_district,
                customer_address,
                customer_id: +id,
            };
            const newAddressRowAdd = await CustomerAddressList.create(newAddressRow);
            res.status(201).send({
                status: "success",
                message: "Add new address successfully!",
                newAddress: newAddressRowAdd,
            });
        }
        catch (err) {
            res.status(500).send({
                status: "fail",
                message: "Server is working wrong!",
            });
        }
    }
    static async updateAddressByCustomerIDNAddressID(req, res) {
        try {
            const { addressID, customerID } = req.params;
            const { customer_address, customer_district, customer_province } = req.body;
            const foundCustomerAddress = await CustomerAddressList.findOne({
                where: {
                    id: addressID,
                    customer_id: customerID,
                },
            });
            const updateAddress = await foundCustomerAddress.update((0, common_1.handleFormatUpdateDataByValidValue)({
                customer_address,
                customer_district,
                customer_province,
                updatedAt: new Date(),
            }, foundCustomerAddress.dataValues));
            res.status(201).send({
                status: "Success",
                message: "Update Success",
                newAddressUpdated: updateAddress,
            });
        }
        catch (err) {
            res.status(500).send("Server is working wrong!");
        }
    }
    static async deleteAddressByCustomerIDNAddressID(req, res) {
        try {
            const { addressID, customerID } = req.params;
            const foundCustomerAddress = await CustomerAddressList.findOne({
                where: {
                    id: addressID,
                    customer_id: customerID,
                },
            });
            if (foundCustomerAddress) {
                await foundCustomerAddress.destroy({
                    where: {
                        id: addressID,
                        customer_id: customerID,
                    },
                });
                res.status(201).send({
                    status: "success",
                    message: "Delete successfully address",
                });
            }
            else {
                res.status(404).send({
                    status: "Not found",
                    message: "Address Not Found",
                });
            }
        }
        catch (err) {
            res.status(500).send("Server is working wrong!");
        }
    }
}
module.exports = CustomerController;
