"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ProductTagList extends sequelize_1.Model {
        static associate({}) { }
    }
    ProductTagList.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        tag_id: {
            type: DataTypes.UUID,
        },
        addition_product_information_id: {
            type: DataTypes.UUID,
        },
    }, {
        sequelize,
        modelName: "ProductTagList",
    });
    return ProductTagList;
};
