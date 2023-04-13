"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserAddress extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User }) {
            UserAddress.belongsTo(User, {
                foreignKey: "user_id",
            });
        }
    }
    UserAddress.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        user_id: {
            type: DataTypes.UUID,
        },
        user_province: { type: DataTypes.STRING },
        user_district: { type: DataTypes.STRING },
        user_specific_address: { type: DataTypes.STRING },
    }, {
        sequelize,
        modelName: "UserAddress",
    });
    return UserAddress;
};
