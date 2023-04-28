"use strict";
import { Model } from "sequelize";
import { OrderProductItemAttributes } from "@/src/ts/interfaces/app_interfaces";

export default (sequelize: any, DataTypes: any) => {
  class OrderProductItems
    extends Model<OrderProductItemAttributes>
    implements OrderProductItemAttributes
  {
    id!: string;
    order_product_list_id!: number;
    order_product_unit!: number;
    static associate({}: any) {}
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
