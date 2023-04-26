"use strict";
import { Model } from "sequelize";

interface OrderProductItemAttributes {
  id: string;
  order_product_list_id: number;
  order_product_unit: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class OrderProductItems
    extends Model<OrderProductItemAttributes>
    implements OrderProductItemAttributes
  {
    id!: string;
    order_product_list_id!: number;
    order_product_unit!: number;
    static associate(models: any) {}
  }
  OrderProductItems.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      order_product_list_id: {
        type: DataTypes.UUID,
      },
      order_product_unit: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "OrderProductItems",
    }
  );
  return OrderProductItems;
};
