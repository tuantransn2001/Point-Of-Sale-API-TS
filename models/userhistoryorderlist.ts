"use strict";
import { Model } from "sequelize";

interface UserHistoryOrderListAttributes {
  id: string;
  user_id: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class UserHistoryOrderList
    extends Model<UserHistoryOrderListAttributes>
    implements UserHistoryOrderListAttributes
  {
    id!: string;
    user_id!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {}
  }
  UserHistoryOrderList.init(
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
      modelName: "UserHistoryOrderList",
    }
  );
  return UserHistoryOrderList;
};
