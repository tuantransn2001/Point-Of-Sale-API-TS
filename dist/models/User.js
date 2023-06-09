"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends sequelize_1.Model {
        static associate({ Customer, Staff, UserAddress }) {
            User.hasOne(Customer, {
                foreignKey: "user_id",
            });
            User.hasOne(Staff, {
                foreignKey: "user_id",
            });
            User.hasMany(UserAddress, {
                foreignKey: "user_id",
            });
        }
    }
    User.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        user_code: {
            type: DataTypes.STRING,
        },
        user_phone: {
            type: DataTypes.STRING,
        },
        user_email: {
            type: DataTypes.STRING,
        },
        user_password: {
            type: DataTypes.STRING,
        },
        user_name: {
            type: DataTypes.STRING,
        },
        user_type: {
            type: DataTypes.STRING,
        },
        isDelete: {
            type: DataTypes.BOOLEAN,
        },
    }, {
        sequelize,
        modelName: "User",
    });
    return User;
};
