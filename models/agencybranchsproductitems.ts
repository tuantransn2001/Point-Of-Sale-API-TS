"use strict";
import { Model } from "sequelize";

interface AgencyBranchProductItemAttributes {
  id: string;
  agency_product_id: number;
  agency_branch_product_name: string;
  agency_branch_product_inventory: number;
  agency_branch_product_cost_price: string;
  agency_branch_product_amount_can_be_sold: number;
  agency_branch_product_amount_being_traded: number;
  agency_branch_product_amount_importing: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class AgencyBranchProductItems
    extends Model<AgencyBranchProductItemAttributes>
    implements AgencyBranchProductItemAttributes
  {
    id!: string;
    agency_product_id!: number;
    agency_branch_product_name!: string;
    agency_branch_product_inventory!: number;
    agency_branch_product_cost_price!: string;
    agency_branch_product_amount_can_be_sold!: number;
    agency_branch_product_amount_being_traded!: number;
    agency_branch_product_amount_importing!: number;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {}
  }
  AgencyBranchProductItems.init(
    {
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
    },
    {
      sequelize,
      modelName: "AgencyBranchProductItems",
    }
  );
  return AgencyBranchProductItems;
};
