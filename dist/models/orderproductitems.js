"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class OrderProductItems extends sequelize_1.Model {
        static associate(models) { }
    }
    OrderProductItems.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        order_product_list_id: {
            type: DataTypes.UUID,
        },
        order_product_unit: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: "OrderProductItems",
    });
    return OrderProductItems;
};
