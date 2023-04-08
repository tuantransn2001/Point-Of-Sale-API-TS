"use strict";
import { Model } from "sequelize";

interface StaffAgencyBranchInChargeAttributes {
  id: string;
  staff_role_id: string;
  agency_branch_id: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class StaffAgencyBranchInCharge
    extends Model<StaffAgencyBranchInChargeAttributes>
    implements StaffAgencyBranchInChargeAttributes
  {
    id!: string;
    staff_role_id!: string;
    agency_branch_id!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      StaffAgencyBranchInCharge.belongsTo(models.StaffRoles, {
        foreignKey: "staff_role_id",
      });
      StaffAgencyBranchInCharge.belongsTo(models.AgencyBranchs, {
        foreignKey: "agency_branch_id",
      });
    }
  }
  StaffAgencyBranchInCharge.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      staff_role_id: { type: DataTypes.UUID },
      agency_branch_id: { type: DataTypes.UUID },
    },
    {
      sequelize,
      modelName: "StaffAgencyBranchInCharge",
    }
  );
  return StaffAgencyBranchInCharge;
};
