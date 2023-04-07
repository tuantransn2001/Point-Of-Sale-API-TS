"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const authenticate = async (req, res, next) => {
    var _a;
    const JWT_TOKEN_SECRET_KEY = (_a = process.env.JWT_TOKEN_SECRET_KEY) !== null && _a !== void 0 ? _a : "default is string";
    try {
        const { token } = req.headers;
        const isAuth = jsonwebtoken_1.default.verify(token, JWT_TOKEN_SECRET_KEY);
        if (isAuth) {
            return next();
        }
        else {
            res.status(403).send({
                status: "Forbidden",
                message: "Client-Error ?? In-Valid Token",
            });
        }
    }
    catch (err) {
        res.status(500).send({
            status: "Fail",
            message: "You are not logged in!",
        });
    }
};
exports.default = authenticate;
