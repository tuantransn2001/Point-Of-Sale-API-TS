"use strict";
import { Model } from "sequelize";

interface StaffRoleAttributes {
  id: string;
  staff_id: string;
  staff_role: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class StaffRoles
    extends Model<StaffRoleAttributes>
    implements StaffRoleAttributes
  {
    id!: string;
    staff_id!: string;
    staff_role!: number;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      StaffRoles.belongsTo(models.Staffs, {
        foreignKey: "staff_id",
      });
      StaffRoles.belongsTo(models.StaffAgencyBranchInCharge, {
        foreignKey: "staff_role_id",
      });
    }
  }
  StaffRoles.init(
    {
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
    },
    {
      sequelize,
      modelName: "StaffRoles",
    }
  );
  return StaffRoles;
};
