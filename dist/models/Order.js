"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Order extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ UserHistoryOrders, Customer, OrderProductList }) { }
    }
    Order.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        user_history_order_id: {
            type: DataTypes.UUID,
        },
        user_id: {
            type: DataTypes.UUID,
        },
        order_tags: {
            type: DataTypes.STRING,
        },
        order_status: {
            type: DataTypes.STRING,
        },
        order_note: {
            type: DataTypes.STRING,
        },
        order_sold_by: {
            type: DataTypes.STRING,
        },
        order_sold_at: {
            type: DataTypes.STRING,
        },
        order_product_source: {
            type: DataTypes.STRING,
        },
        order_code: {
            type: DataTypes.STRING,
        },
        order_payment_type: {
            type: DataTypes.STRING,
        },
        order_delivery_date: {
            type: DataTypes.DATE,
        },
    }, {
        sequelize,
        modelName: "Order",
    });
    return Order;
};
