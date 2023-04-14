"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { v4: uuidv4 } = require("uuid");
const models_1 = __importDefault(require("../models"));
const { Customer, User, UserAddress } = models_1.default;
const common_1 = require("../src/common");
class UserAddressController {
    static async addNewAddressByUserID(req, res, next) {
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
    static async updateAddressByID(req, res, next) {
        try {
            const { id } = req.params;
            const { user_province, user_district, user_specific_address } = req.body;
            const foundAddress = await UserAddress.findByPk(id);
            const updateAddressRow = (0, common_1.handleFormatUpdateDataByValidValue)({
                user_province,
                user_district,
                user_specific_address,
            }, foundAddress.dataValues);
            await UserAddress.update(updateAddressRow, {
                where: {
                    id,
                },
            });
            res.status(201).send({
                status: "Success",
                message: "Update Success",
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async deleteAddressByID(req, res, next) {
        try {
            const { id } = req.params;
            await UserAddress.destroy({
                where: {
                    id,
                },
            });
            res.status(201).send({
                status: "success",
                message: "Delete successfully address",
            });
        }
        catch (err) {
            next(err);
        }
    }
}
module.exports = UserAddressController;
