"use strict";
import { Model } from "sequelize";
import { OrderProductListAttributes } from "@/src/ts/interfaces/app_interfaces";

export default (sequelize: any, DataTypes: any) => {
  class OrderProductList
    extends Model<OrderProductListAttributes>
    implements OrderProductListAttributes
  {
    id!: string;
    order_id!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({}: any) {}
  }
  OrderProductList.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      order_id: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: "OrderProductList",
    }
  );
  return OrderProductList;
};
