"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
const { Users } = models_1.default;
const checkUserExist = () => async (req, res, next) => {
    try {
        const { user_code, user_name, user_phone, user_email } = req.body;
        const errorMessage = new Array();
        // * ================= Name =============
        if (user_name)
            await Users.findOne({
                where: {
                    user_name,
                },
            }).then((res) => {
                if (res)
                    errorMessage.push(`Customer with name is ${res.dataValues.user_name} has been already exist`);
            });
        // * ================= Code =============
        if (user_code)
            await Users.findOne({
                where: {
                    user_code,
                },
            }).then((res) => {
                if (res)
                    errorMessage.push(`Customer with code is ${res.dataValues.user_code} has been already exist`);
            });
        // * ================= Phone =============
        if (user_phone)
            await Users.findOne({
                where: {
                    user_phone,
                },
            }).then((res) => {
                if (res)
                    errorMessage.push(`Customer with phone is ${res.dataValues.user_phone} has been already exist`);
            });
        // * ================= Email =============
        if (user_email)
            await Users.findOne({
                where: {
                    user_email,
                },
            }).then((res) => {
                if (res)
                    errorMessage.push(`Customer with email is ${res.dataValues.user_email} has been already exist`);
            });
        if (errorMessage.length > 0) {
            res.status(406).send({
                status: "fail",
                message: errorMessage,
            });
        }
        else {
            return next();
        }
    }
    catch (err) {
        res.status(500).send({
            status: "err",
            message: "Check exist middleware is working wrong!",
        });
    }
};
exports.default = checkUserExist;
