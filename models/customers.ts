"use strict";
import { Model } from "sequelize";

interface CustomerAttributes {
  id: string;
  staff_id: number;
  customer_status: string;
  staff_in_charge_note: string;
  tags: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Customers
    extends Model<CustomerAttributes>
    implements CustomerAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    staff_id!: number;
    customer_status!: string;
    staff_in_charge_note!: string;
    tags!: string;
    static associate(models: any) {}
  }
  Customers.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      staff_id: DataTypes.UUID,
      customer_status: DataTypes.STRING,
      staff_in_charge_note: DataTypes.STRING,
      tags: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Customers",
    }
  );
  return Customers;
};
