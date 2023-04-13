"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class StaffAgencyBranchInCharge extends sequelize_1.Model {
        static associate(models) {
            StaffAgencyBranchInCharge.belongsTo(models.StaffRole, {
                foreignKey: "staff_role_id",
            });
            StaffAgencyBranchInCharge.belongsTo(models.AgencyBranches, {
                foreignKey: "agency_branch_id",
            });
        }
    }
    StaffAgencyBranchInCharge.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        staff_role_id: { type: DataTypes.UUID },
        agency_branch_id: { type: DataTypes.UUID },
    }, {
        sequelize,
        modelName: "StaffAgencyBranchInCharge",
    });
    return StaffAgencyBranchInCharge;
};
