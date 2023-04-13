"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
("use strict");
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class StaffRole extends sequelize_1.Model {
        static associate({ Staff, Role, StaffAgencyBranchInCharge }) {
            StaffRole.hasOne(Role, { foreignKey: "role_id" });
            StaffRole.belongsTo(Staff, {
                foreignKey: "staff_id",
            });
            StaffRole.hasMany(StaffAgencyBranchInCharge, {
                foreignKey: "staff_role_id",
            });
        }
    }
    StaffRole.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        role_id: {
            type: DataTypes.UUID,
        },
        staff_id: {
            type: DataTypes.UUID,
        },
    }, {
        sequelize,
        modelName: "StaffRole",
    });
    return StaffRole;
};
