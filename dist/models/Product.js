"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Products extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) { }
    }
    Products.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        order_product_item_id: {
            type: DataTypes.UUID,
        },
        agency_branch_product_item_id: {
            type: DataTypes.UUID,
        },
        addition_product_information_id: {
            type: DataTypes.UUID,
        },
        product_classify: {
            type: DataTypes.STRING,
        },
        product_SKU: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: "Products",
    });
    return Products;
};
