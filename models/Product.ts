"use strict";
import { Model } from "sequelize";
import { ProductAttributes } from "../src/ts/interfaces/app_interfaces";

module.exports = (sequelize: any, DataTypes: any) => {
  class Products extends Model<ProductAttributes> implements ProductAttributes {
    id!: string;
    order_product_item_id!: string;
    agency_branch_product_item_id!: string;
    addition_product_information_id!: string;
    product_classify!: string;
    product_SKU!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {}
  }
  Products.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },

      order_product_item_id: {
        type: DataTypes.UUID,
      },
      agency_branch_product_item_id: {
        type: DataTypes.UUID,
      },
      addition_product_information_id: {
        type: DataTypes.UUID,
      },
      product_classify: {
        type: DataTypes.STRING,
      },
      product_SKU: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
