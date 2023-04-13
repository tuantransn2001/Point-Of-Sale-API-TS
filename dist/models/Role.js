"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
("use strict");
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Role extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ RolePermission, StaffRole }) {
            Role.hasMany(RolePermission, {
                foreignKey: "role_id",
            });
            Role.belongsTo(StaffRole, {
                foreignKey: "role_id",
            });
        }
    }
    Role.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        role_title: {
            type: DataTypes.STRING,
        },
        role_description: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: "Role",
    });
    return Role;
};
