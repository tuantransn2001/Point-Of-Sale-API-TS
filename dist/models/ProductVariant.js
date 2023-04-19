"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ProductVariant extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) { }
    }
    ProductVariant.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        product_variant_name: {
            type: DataTypes.STRING,
        },
        product_variant_SKU: {
            type: DataTypes.STRING,
        },
        product_variant_barcode: {
            type: DataTypes.STRING,
        },
        product_weight: {
            type: DataTypes.STRING,
        },
        product_weight_calculator_unit: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: "ProductVariant",
    });
    return ProductVariant;
};
