"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Customer extends sequelize_1.Model {
        static associate({ User, Staff, Order, UserHistoryOrders, CustomerTag, }) {
            Customer.belongsTo(User, {
                foreignKey: "user_id",
            });
            Customer.belongsTo(Staff, { foreignKey: "staff_id" });
            Customer.hasMany(Order, {
                foreignKey: "customer_id",
            });
            Customer.hasMany(UserHistoryOrders, {
                foreignKey: "customer_id",
            });
            Customer.hasMany(CustomerTag, {
                foreignKey: "customer_id"
            });
        }
    }
    Customer.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        staff_id: DataTypes.UUID,
        user_id: { type: DataTypes.UUID },
        customer_status: { type: DataTypes.STRING },
        staff_in_charge_note: { type: DataTypes.STRING },
        tags: { type: DataTypes.STRING },
    }, {
        sequelize,
        modelName: "Customer",
    });
    return Customer;
};
