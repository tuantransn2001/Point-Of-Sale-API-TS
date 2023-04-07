"use strict";
import { Model } from "sequelize";

interface UserAttributes {
  id: string;
  user_code: string;
  user_phone: string;
  user_email: string;
  user_password: string;
  user_name: string;
  user_type: string;
  isDelete: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Users extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    user_code!: string;
    user_phone!: string;
    user_email!: string;
    user_password!: string;
    user_name!: string;
    user_type!: string;
    isDelete!: boolean;
    static associate(models: any) {}
  }
  Users.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      user_code: {
        type: DataTypes.STRING,
      },
      user_phone: {
        type: DataTypes.STRING,
      },
      user_email: {
        type: DataTypes.STRING,
      },
      user_password: {
        type: DataTypes.STRING,
      },
      user_name: {
        type: DataTypes.STRING,
      },
      user_type: {
        type: DataTypes.STRING,
      },
      isDelete: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
