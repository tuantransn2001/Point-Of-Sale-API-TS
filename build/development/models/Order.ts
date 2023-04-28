"use strict";
import { Model } from "sequelize";
import { OrderAttributes } from "@/src/ts/interfaces/app_interfaces";

export default (sequelize: any, DataTypes: any) => {
  class Order extends Model<OrderAttributes> implements OrderAttributes {
    id!: string;
    user_history_order_id!: number;
    user_id!: string;
    order_tags!: string;
    order_status!: string;
    order_note!: string;
    order_sold_by!: string;
    order_sold_at!: string;
    order_product_source!: string;
    order_code!: string;
    order_payment_type!: string;
    order_delivery_date!: Date;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({}: any) {}
  }
  Order.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      user_history_order_id: {
        type: DataTypes.UUID,
      },
      user_id: {
        type: DataTypes.UUID,
      },
      order_tags: {
        type: DataTypes.STRING,
      },
      order_status: {
        type: DataTypes.STRING,
      },
      order_note: {
        type: DataTypes.STRING,
      },
      order_sold_by: {
        type: DataTypes.STRING,
      },
      order_sold_at: {
        type: DataTypes.STRING,
      },
      order_product_source: {
        type: DataTypes.STRING,
      },
      order_code: {
        type: DataTypes.STRING,
      },
      order_payment_type: {
        type: DataTypes.STRING,
      },
      order_delivery_date: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
