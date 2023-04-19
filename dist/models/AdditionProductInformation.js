"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class AdditionProductInformation extends sequelize_1.Model {
        static associate({}) { }
    }
    AdditionProductInformation.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        type_id: {
            type: DataTypes.UUID,
        },
        brand_id: {
            type: DataTypes.UUID,
        },
    }, {
        sequelize,
        modelName: "AdditionProductInformation",
    });
    return AdditionProductInformation;
};
