"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserCustomerList extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            UserCustomerList.belongsTo(models.Users, {
                foreignKey: "user_id",
            });
            UserCustomerList.belongsTo(models.Customers, {
                foreignKey: "customer_id",
            });
        }
    }
    UserCustomerList.init({
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
    }, {
        sequelize,
        modelName: "UserCustomerList",
    });
    return UserCustomerList;
};
