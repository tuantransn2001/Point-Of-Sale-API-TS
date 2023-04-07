"use strict";
import { Model } from "sequelize";

interface OrderProductListAttributes {
  id: string;
  order_id: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
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
    static associate(models: any) {}
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
