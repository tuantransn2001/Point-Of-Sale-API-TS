"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Staff extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User, StaffRole, Customer }) {
            Staff.hasMany(StaffRole, {
                foreignKey: "staff_id",
            });
            Staff.belongsTo(User, {
                foreignKey: "user_id",
            });
            Staff.hasMany(Customer, {
                foreignKey: "staff_id",
            });
        }
    }
    Staff.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        user_id: DataTypes.UUID,
        staff_status: DataTypes.STRING,
        staff_birthday: DataTypes.DATE,
        note_about_staff: DataTypes.STRING,
        staff_gender: DataTypes.BOOLEAN,
        isAllowViewImportNWholesalePrice: DataTypes.BOOLEAN,
        isAllowViewShippingPrice: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: "Staff",
    });
    return Staff;
};
