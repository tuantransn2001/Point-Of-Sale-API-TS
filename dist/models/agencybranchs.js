"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class AgencyBranch extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) { }
    }
    AgencyBranch.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        agency_branch_name: {
            type: DataTypes.STRING,
        },
        agency_branch_phone: {
            type: DataTypes.STRING,
        },
        agency_branch_code: {
            type: DataTypes.STRING,
        },
        agency_branch_address: {
            type: DataTypes.STRING,
        },
        agency_branch_area: {
            type: DataTypes.STRING,
        },
        agency_branch_expiration_date: {
            type: DataTypes.DATE,
        },
        agency_branch_status: {
            type: DataTypes.STRING,
        },
        isDefaultCN: {
            type: DataTypes.BOOLEAN,
        },
    }, {
        sequelize,
        modelName: "AgencyBranch",
    });
    return AgencyBranch;
};
