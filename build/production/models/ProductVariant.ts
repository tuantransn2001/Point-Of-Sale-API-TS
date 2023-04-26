"use strict";
import { Model } from "sequelize";
import { ProductVariantAttributes } from "@/src/ts/interfaces/app_interfaces";
export default (sequelize: any, DataTypes: any) => {
  class ProductVariant
    extends Model<ProductVariantAttributes>
    implements ProductVariantAttributes
  {
    id!: string;
    product_variant_name!: string;
    product_variant_SKU!: string;
    product_variant_barcode!: string;
    product_weight!: string;
    product_weight_calculator_unit!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({}: any) {}
  }
  ProductVariant.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },

      product_variant_name: {
        type: DataTypes.STRING,
      },
      product_variant_SKU: {
        type: DataTypes.STRING,
      },
      product_variant_barcode: {
        type: DataTypes.STRING,
      },
      product_weight: {
        type: DataTypes.STRING,
      },
      product_weight_calculator_unit: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "ProductVariant",
    }
  );
  return ProductVariant;
};
