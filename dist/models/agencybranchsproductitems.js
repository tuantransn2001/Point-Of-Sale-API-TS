"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class AgencyBranchProductItems extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) { }
    }
    AgencyBranchProductItems.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        agency_product_id: {
            type: DataTypes.UUID,
        },
        agency_branch_product_name: {
            type: DataTypes.STRING,
        },
        agency_branch_product_inventory: {
            type: DataTypes.INTEGER,
        },
        agency_branch_product_cost_price: {
            type: DataTypes.STRING,
        },
        agency_branch_product_amount_can_be_sold: {
            type: DataTypes.INTEGER,
        },
        agency_branch_product_amount_being_traded: {
            type: DataTypes.INTEGER,
        },
        agency_branch_product_amount_importing: {
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        modelName: "AgencyBranchProductItems",
    });
    return AgencyBranchProductItems;
};
