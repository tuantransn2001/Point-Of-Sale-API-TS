"use strict";
import { Model } from "sequelize";

interface StaffAttributes {
  id: string;
  staff_status: string;
  staff_birthday: Date;
  note_about_staff: string;
  staff_gender: string;
  staff_province: string;
  staff_district: string;
  staff_address: string;
  isAllowViewImportNWholesalePrice: boolean;
  isAllowViewShippingPrice: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Staffs extends Model<StaffAttributes> implements StaffAttributes {
    id!: string;
    staff_status!: string;
    staff_birthday!: Date;
    note_about_staff!: string;
    staff_gender!: string;
    staff_province!: string;
    staff_district!: string;
    staff_address!: string;
    isAllowViewImportNWholesalePrice!: boolean;
    isAllowViewShippingPrice!: boolean;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      Staffs.hasMany(models.StaffRoles, {
        foreignKey: "staff_id",
      });
    }
  }
  Staffs.init(
    {
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
    },
    {
      sequelize,
      modelName: "Staffs",
    }
  );
  return Staffs;
};
