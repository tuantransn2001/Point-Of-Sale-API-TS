"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const authenticate = async (req, res, next) => {
    try {
        const JWT_TOKEN_SECRET_KEY = process.env
            .JWT_TOKEN_SECRET_KEY;
        const { token } = req.headers;
        const isAuth = jsonwebtoken_1.default.verify(token, JWT_TOKEN_SECRET_KEY);
        if (isAuth) {
            req.currentUserID = isAuth.id;
            return next();
        }
        else {
            res.status(401).send({
                status: "Unauthorised",
                message: "Client-Error && In-Valid Token",
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
