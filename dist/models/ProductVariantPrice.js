"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ProductVariantPrice extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) { }
    }
    ProductVariantPrice.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        product_variant_id: {
            type: DataTypes.UUID,
        },
        price_id: {
            type: DataTypes.UUID,
        },
        price_value: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: "ProductVariantPrice",
    });
    return ProductVariantPrice;
};
