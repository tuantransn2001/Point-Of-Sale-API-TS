"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Staffs extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Staffs.hasMany(models.StaffRoles, {
                foreignKey: "staff_id",
            });
        }
    }
    Staffs.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        staff_status: DataTypes.STRING,
        staff_birthday: DataTypes.DATE,
        note_about_staff: DataTypes.STRING,
        staff_gender: DataTypes.STRING,
        staff_province: DataTypes.STRING,
        staff_district: DataTypes.STRING,
        staff_address: DataTypes.STRING,
        isAllowViewImportNWholesalePrice: DataTypes.BOOLEAN,
        isAllowViewShippingPrice: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: "Staffs",
    });
    return Staffs;
};
