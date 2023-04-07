"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class StaffAgencyBranchInCharge extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            StaffAgencyBranchInCharge.belongsTo(models.StaffRoles, {
                foreignKey: "staff_role_id",
            });
            StaffAgencyBranchInCharge.belongsTo(models.AgencyBranch, {
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
        staff_role_id: DataTypes.UUID,
        agency_branch_id: DataTypes.UUID,
    }, {
        sequelize,
        modelName: "StaffAgencyBranchInCharge",
    });
    return StaffAgencyBranchInCharge;
};
