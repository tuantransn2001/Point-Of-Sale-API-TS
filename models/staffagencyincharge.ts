"use strict";
import { Model } from "sequelize";

interface StaffAgencyInChargeAttributes {
  id: string;
  staff_id: string;
  agency_id: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class StaffAgencyInCharge
    extends Model<StaffAgencyInChargeAttributes>
    implements StaffAgencyInChargeAttributes
  {
    id!: string;
    staff_id!: string;
    agency_id!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  StaffAgencyInCharge.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      staff_id: DataTypes.UUID,
      agency_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "StaffAgencyInCharge",
    }
  );
  return StaffAgencyInCharge;
};
