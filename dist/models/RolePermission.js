"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class RolePermission extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Role }) {
            RolePermission.belongsTo(Role, {
                foreignKey: "role_id",
            });
        }
    }
    RolePermission.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        role_id: {
            type: DataTypes.UUID,
        },
        role_permission_description: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: "RolePermission",
    });
    return RolePermission;
};
