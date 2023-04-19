"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class CustomerTag extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Tag, Customer }) {
            CustomerTag.belongsTo(Tag, {
                foreignKey: "tag_id",
            });
            CustomerTag.belongsTo(Customer, {
                foreignKey: "customer_id",
            });
        }
    }
    CustomerTag.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        customer_id: { type: DataTypes.UUID },
        tag_id: { type: DataTypes.UUID },
    }, {
        sequelize,
        modelName: "CustomerTag",
    });
    return CustomerTag;
};
