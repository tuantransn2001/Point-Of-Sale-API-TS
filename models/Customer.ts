"use strict";
import { Model } from "sequelize";

interface CustomerAttributes {
  id: string;
  user_id: string;
  staff_id: string;
  customer_status: string;
  staff_in_charge_note: string;
  tags: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Customer
    extends Model<CustomerAttributes>
    implements CustomerAttributes
  {
    id!: string;
    user_id!: string;
    staff_id!: string;
    customer_status!: string;
    staff_in_charge_note!: string;
    tags!: string;
    static associate({
      User,
      Staff,
      Order,
      UserHistoryOrders,
      CustomerTag,
    }: any) {
      Customer.belongsTo(User, {
        foreignKey: "user_id",
      });
      Customer.belongsTo(Staff, { foreignKey: "staff_id" });
      Customer.hasMany(Order, {
        foreignKey: "customer_id",
      });
      Customer.hasMany(UserHistoryOrders, {
        foreignKey: "customer_id",
      });
      Customer.hasMany(CustomerTag , {
        foreignKey: "customer_id"
      } )
    }
  }
  Customer.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      staff_id: DataTypes.UUID,
      user_id: { type: DataTypes.UUID },
      customer_status: { type: DataTypes.STRING },
      staff_in_charge_note: { type: DataTypes.STRING },
      tags: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
