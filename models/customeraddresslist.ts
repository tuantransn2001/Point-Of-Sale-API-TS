"use strict";
import { Model } from "sequelize";

interface CustomerAddressListAttributes {
  id: string;
  customer_id: number;
  customer_province: string;
  customer_district: string;
  customer_address: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class CustomerAddressList
    extends Model<CustomerAddressListAttributes>
    implements CustomerAddressListAttributes
  {
    id!: string;
    customer_id!: number;
    customer_province!: string;
    customer_district!: string;
    customer_address!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      CustomerAddressList.belongsTo(models.Customers, {
        foreignKey: "customer_id",
      });
    }
  }
  CustomerAddressList.init(
    {
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
    },
    {
      sequelize,
      modelName: "CustomerAddressList",
    }
  );
  return CustomerAddressList;
};
