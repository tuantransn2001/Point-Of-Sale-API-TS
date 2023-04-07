"use strict";
import { Model } from "sequelize";

interface UserStaffListAttributes {
  id: string;
  user_id: string;
  staff_id: string;
  user_staff_list_note: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class UserStaffList
    extends Model<UserStaffListAttributes>
    implements UserStaffListAttributes
  {
    id!: string;
    user_id!: string;
    staff_id!: string;
    user_staff_list_note!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      UserStaffList.belongsTo(models.Users, {
        foreignKey: "user_id",
      });
      UserStaffList.belongsTo(models.Staffs, {
        foreignKey: "staff_id",
      });
    }
  }
  UserStaffList.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: DataTypes.UUID,
      staff_id: DataTypes.UUID,
      user_staff_list_note: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserStaffList",
    }
  );
  return UserStaffList;
};
