"use strict";
import { Model } from "sequelize";
import { ProductTagItemAttributes } from "@/src/ts/interfaces/app_interfaces";

export default (sequelize: any, DataTypes: any) => {
  class ProductTagList
    extends Model<ProductTagItemAttributes>
    implements ProductTagItemAttributes
  {
    id!: string;
    tag_id!: string;
    addition_product_information_id!: string;

    static associate({}: any) {}
  }
  ProductTagList.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      tag_id: {
        type: DataTypes.UUID,
      },
      addition_product_information_id: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: "ProductTagList",
    }
  );
  return ProductTagList;
};
