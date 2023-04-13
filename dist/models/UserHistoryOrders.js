"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserHistoryOrders extends sequelize_1.Model {
        static associate({ User, Order }) {
            UserHistoryOrders.hasMany(Order, {
                foreignKey: "user_history_order_id",
            });
        }
    }
    UserHistoryOrders.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        user_id: {
            type: DataTypes.UUID,
        },
    }, {
        sequelize,
        modelName: "UserHistoryOrders",
    });
    return UserHistoryOrders;
};
