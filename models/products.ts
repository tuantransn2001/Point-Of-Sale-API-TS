"use strict";
import { Model } from "sequelize";

interface ProductAttributes {
  id: string;
  order_product_item_id: string;
  agency_branch_product_item_id: string;
  product_name: string;
  product_image: string;
  product_sku: string;
  product_barcode: string;
  product_weight: string;
  product_unit_type: string;
  product_classify: string;
  product_type: string;
  product_branch: string;
  product_tags: string;
  product_retail_price: string;
  product_shopee_price: string;
  product_price_sell_over_10m: string;
  product_price_sell_under_10m: string;
  product_warranty: string;
  product_wholesale_price: string;
  product_import_price: string;
  product_import_shopee_price: string;
  product_sell_status: string;
  product_inventory: number;
  product_can_be_sold: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Products extends Model<ProductAttributes> implements ProductAttributes {
    id!: string;
    order_product_item_id!: string;
    agency_branch_product_item_id!: string;
    product_name!: string;
    product_image!: string;
    product_sku!: string;
    product_barcode!: string;
    product_weight!: string;
    product_unit_type!: string;
    product_classify!: string;
    product_type!: string;
    product_branch!: string;
    product_tags!: string;
    product_retail_price!: string;
    product_shopee_price!: string;
    product_price_sell_over_10m!: string;
    product_price_sell_under_10m!: string;
    product_warranty!: string;
    product_wholesale_price!: string;
    product_import_price!: string;
    product_import_shopee_price!: string;
    product_sell_status!: string;
    product_inventory!: number;
    product_can_be_sold!: number;
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
      product_name: {
        type: DataTypes.STRING,
      },
      product_image: {
        type: DataTypes.INTEGER,
      },
      product_sku: {
        type: DataTypes.STRING,
      },
      product_barcode: {
        type: DataTypes.STRING,
      },
      product_weight: {
        type: DataTypes.STRING,
      },
      product_unit_type: {
        type: DataTypes.STRING,
      },
      product_classify: {
        type: DataTypes.STRING,
      },
      product_type: {
        type: DataTypes.STRING,
      },
      product_branch: {
        type: DataTypes.STRING,
      },
      product_tags: {
        type: DataTypes.STRING,
      },
      product_retail_price: {
        type: DataTypes.STRING,
      },
      product_shopee_price: {
        type: DataTypes.STRING,
      },
      product_price_sell_over_10m: {
        type: DataTypes.STRING,
      },
      product_price_sell_under_10m: {
        type: DataTypes.STRING,
      },
      product_warranty: {
        type: DataTypes.STRING,
      },
      product_wholesale_price: {
        type: DataTypes.STRING,
      },
      product_import_price: {
        type: DataTypes.STRING,
      },
      product_import_shopee_price: {
        type: DataTypes.STRING,
      },
      product_sell_status: {
        type: DataTypes.STRING,
      },
      product_inventory: {
        type: DataTypes.STRING,
      },
      product_can_be_sold: {
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
