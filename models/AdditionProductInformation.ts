"use strict";
import { Model } from "sequelize";
import { AdditionProductInformationAttributes } from "../src/ts/interfaces/app_interfaces";

module.exports = (sequelize: any, DataTypes: any) => {
  class AdditionProductInformation
    extends Model<AdditionProductInformationAttributes>
    implements AdditionProductInformationAttributes
  {
    id!: string;
    type_id!: string;
    brand_id!: string;

    static associate({}: any) {}
  }
  AdditionProductInformation.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      type_id: {
        type: DataTypes.UUID,
      },
      brand_id: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: "AdditionProductInformation",
    }
  );
  return AdditionProductInformation;
};
