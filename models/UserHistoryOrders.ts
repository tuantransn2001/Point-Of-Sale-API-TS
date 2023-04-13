"use strict";
import { Model } from "sequelize";

interface UserHistoryOrdersAttributes {
  id: string;
  user_id: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class UserHistoryOrders
    extends Model<UserHistoryOrdersAttributes>
    implements UserHistoryOrdersAttributes
  {
    id!: string;
    user_id!: string;
    static associate({ User, Order }: any) {
      UserHistoryOrders.hasMany(Order, {
        foreignKey: "user_history_order_id",
      });
    }
  }
  UserHistoryOrders.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: "UserHistoryOrders",
    }
  );
  return UserHistoryOrders;
};
