"use strict";
import { Model } from "sequelize";
import { UserHistoryOrdersAttributes } from "@/src/ts/interfaces/app_interfaces";
export default (sequelize: any, DataTypes: any) => {
  class UserHistoryOrders
    extends Model<UserHistoryOrdersAttributes>
    implements UserHistoryOrdersAttributes
  {
    id!: string;
    user_id!: string;
    static associate({}: any) {}
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
