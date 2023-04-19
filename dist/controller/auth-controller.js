"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = __importDefault(require("../models"));
dotenv_1.default.config();
class AuthController {
    static async login(req, res, next) {
        try {
            const { phone, password, } = req.body;
            const foundUser = await models_1.default.User.findOne({
                where: {
                    user_phone: phone,
                },
            });
            // ? Check user is exist or not by phone
            if (foundUser) {
                // * Case Exist
                const isMatchPassword = foundUser.dataValues.user_password === password;
                switch (isMatchPassword) {
                    case true: {
                        const { id, user_name } = foundUser.dataValues;
                        const tokenPayload = {
                            id,
                            user_name,
                        };
                        const jwtSecretKey = process.env
                            .JWT_TOKEN_SECRET_KEY;
                        const token = jsonwebtoken_1.default.sign(tokenPayload, jwtSecretKey, {
                            expiresIn: "3d",
                        });
                        res.status(201).send({
                            status: "Login Success",
                            token,
                        });
                        break;
                    }
                    case false: {
                        res.status(403).send({
                            status: "Fail",
                            message: `Password is in-correct ! Please check it and try again!`,
                        });
                        break;
                    }
                }
            }
            else {
                // * Case does not exist
                res.status(404).send({
                    status: "Not found",
                    message: `User with phone: ${phone} doesn't exist ! Please check it and try again!`,
                });
            }
        }
        catch (err) {
            next(err);
        }
    }
}
module.exports = AuthController;
