"use strict";
import { Model } from "sequelize";

interface UserCustomerListAttributes {
  id: string;
  customer_id: string;
  user_id: string;
  user_customer_list_note: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class UserCustomerList
    extends Model<UserCustomerListAttributes>
    implements UserCustomerListAttributes
  {
    id!: string;
    customer_id!: string;
    user_id!: string;
    user_customer_list_note!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      UserCustomerList.belongsTo(models.Users, {
        foreignKey: "user_id",
      });
      UserCustomerList.belongsTo(models.Customers, {
        foreignKey: "customer_id",
      });
    }
  }
  UserCustomerList.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      customer_id: {
        type: DataTypes.UUID,
      },
      user_id: {
        type: DataTypes.UUID,
      },
      user_customer_list_note: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "UserCustomerList",
    }
  );
  return UserCustomerList;
};
