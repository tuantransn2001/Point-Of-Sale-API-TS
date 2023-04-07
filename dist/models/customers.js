"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Customers extends sequelize_1.Model {
        static associate(models) { }
    }
    Customers.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        staff_id: DataTypes.UUID,
        customer_status: DataTypes.STRING,
        staff_in_charge_note: DataTypes.STRING,
        tags: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "Customers",
    });
    return Customers;
};
