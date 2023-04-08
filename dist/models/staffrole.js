"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class StaffRoles extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            StaffRoles.belongsTo(models.Staffs, {
                foreignKey: "staff_id",
            });
            StaffRoles.belongsTo(models.StaffAgencyBranchInCharge, {
                foreignKey: "staff_role_id",
            });
        }
    }
    StaffRoles.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        staff_id: { type: DataTypes.UUID },
        staff_role: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: "StaffRoles",
    });
    return StaffRoles;
};
