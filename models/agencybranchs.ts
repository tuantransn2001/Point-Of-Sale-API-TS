"use strict";
import { Model } from "sequelize";

interface AgencyBranchAttributes {
  id: string;
  agency_branch_name: string;
  agency_branch_phone: string;
  agency_branch_code: string;
  agency_branch_address: string;
  agency_branch_area: string;
  agency_branch_expiration_date: string;
  agency_branch_status: string;
  isDefaultCN: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class AgencyBranches
    extends Model<AgencyBranchAttributes>
    implements AgencyBranchAttributes
  {
    id!: string;
    agency_branch_name!: string;
    agency_branch_phone!: string;
    agency_branch_code!: string;
    agency_branch_address!: string;
    agency_branch_area!: string;
    agency_branch_expiration_date!: string;
    agency_branch_status!: string;
    isDefaultCN!: boolean;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      AgencyBranches.hasOne(models.StaffAgencyBranchInCharge, {
        foreignKey: "agency_branch_id",
      });
    }
  }
  AgencyBranches.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      agency_branch_name: {
        type: DataTypes.STRING,
      },
      agency_branch_phone: {
        type: DataTypes.STRING,
      },
      agency_branch_code: {
        type: DataTypes.STRING,
      },
      agency_branch_address: {
        type: DataTypes.STRING,
      },
      agency_branch_area: {
        type: DataTypes.STRING,
      },
      agency_branch_expiration_date: {
        type: DataTypes.DATE,
      },
      agency_branch_status: {
        type: DataTypes.STRING,
      },
      isDefaultCN: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "AgencyBranches",
    }
  );
  return AgencyBranches;
};
