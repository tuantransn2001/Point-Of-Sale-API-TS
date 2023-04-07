"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class CustomerAddressList extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            CustomerAddressList.belongsTo(models.Customers, {
                foreignKey: "customer_id",
            });
        }
    }
    CustomerAddressList.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        customer_id: DataTypes.UUID,
        customer_province: DataTypes.STRING,
        customer_district: DataTypes.STRING,
        customer_address: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "CustomerAddressList",
    });
    return CustomerAddressList;
};
