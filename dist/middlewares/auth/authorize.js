"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../../models"));
const authorize = async (req, res, next) => {
    try {
        const authorizeArr = ["admin"];
        const userID = req.currentUserID;
        const foundUser = await models_1.default.User.findByPk(userID);
        const isAdmin = authorizeArr.includes(foundUser.dataValues.user_type);
        if (isAdmin) {
            return next();
        }
        else {
            res
                .status(406)
                .send({ status: "Not Acceptable", message: "You are not Admin!!" });
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.default = authorize;
