"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Brand extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({}) { }
    }
    Brand.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        brand_title: {
            type: DataTypes.STRING,
        },
        brand_description: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: "Brand",
    });
    return Brand;
};
