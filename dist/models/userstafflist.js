"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserStaffList extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            UserStaffList.belongsTo(models.Users, {
                foreignKey: "user_id",
            });
            UserStaffList.belongsTo(models.Staffs, {
                foreignKey: "staff_id",
            });
        }
    }
    UserStaffList.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        user_id: DataTypes.UUID,
        staff_id: DataTypes.UUID,
        user_staff_list_note: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "UserStaffList",
    });
    return UserStaffList;
};
