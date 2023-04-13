import { Request, Response } from "express";
const { v4: uuidv4 } = require("uuid");
import db from "../models";
const { Customer, User, UserAddress } = db;
import { User, Customer, Address } from "../src/common/type";
import {
  handleFormatCustomer,
  handleFormatUpdateDataByValidValue,
} from "../src/common";
class CustomerController {
  public static async getAll(req: Request, res: Response) {
    try {
      const User_Customer_List = await User.findAll({
        where: {
          isDelete: null,
          user_type: "customer",
        },
        include: [
          {
            model: Customer,
          },
        ],
      });
      const User_Address_List = await UserAddress.findAll();

      res.status(200).send({
        status: "success",
        data: handleFormatCustomer(
          User_Customer_List,
          User_Address_List,
          "isArray"
        ),
      });
    } catch (err) {
      res.status(500).send({
        status: "error",
        message: "Server is working wrong!",
      });
    }
  }
  public static async getByID(req: Request, res: Response) {
    try {
      const { id } = req.params; // ? This id is belongs to User

      const foundCustomer = await User.findOne({
        include: [
          {
            model: Customer,
            where: {
              user_id: id,
            },
          },
        ],
        where: {
          isDelete: null,
          user_type: "customer",
        },
      });

      // TODO: Add check address exist or not

      if (foundCustomer) {
        const foundCustomerAddressList = await UserAddress.findAll({
          where: {
            user_id: id,
          },
        });

        res.status(200).send({
          status: "success",
          data: handleFormatCustomer(
            foundCustomer,
            foundCustomerAddressList,
            "isObject"
          ),
        });
      } else {
        res.status(404).send({
          status: "Fail",
          data: "Customer Not Found",
        });
      }
    } catch (err) {
      res.status(500).send({
        status: "fail",
        message: "Server is working wrong!",
      });
    }
  }
  public static async create(req: Request, res: Response) {
    try {
      const {
        user_name,
        user_code,
        user_phone,
        user_email,
        customer_status,
        address_list,
        // TODO: Client provide staff_id with uuid
        staff_id,
        staff_in_charge_note,
        tags,
      } = req.body;

      const userID = uuidv4();

      const newUserRow: User = {
        id: userID,
        user_code,
        user_phone,
        user_email,
        user_name,
        user_type: "customer",
        isDelete: null,
      };

      const newCustomerRow: Customer = {
        user_id: userID,
        // TODO: Add STAFF ID
        staff_in_charge_note,
        tags,
        customer_status,
      };

      const userAddressArray: Array<Address> = address_list.map(
        (address: Address) => {
          const { user_province, user_district, user_specific_address } =
            address;
          const newAddress = {
            user_id: userID,
            user_province,
            user_district,
            user_specific_address,
          };
          return newAddress;
        }
      );

      const newUserCreated: User = await User.create(newUserRow);
      const newCustomerCreated: Customer = await Customer.create(
        newCustomerRow
      );
      const newUserAddressListCreated: Array<Address> =
        await UserAddress.bulkCreate(userAddressArray);

      res.status(201).send({
        status: "Success",
        message: "Created successfully!",
        data: {
          newUserCreated,
          newCustomerCreated,
          newUserAddressListCreated,
        },
      });
    } catch (err) {
      res
        .status(500)
        .send({ status: "Fail", message: "Server is working wrong!" });
    }
  }
  public static async deleteByID(req: Request, res: Response) {
    try {
      const { id } = req.params; // ? ID nay la user id
      const foundUser = await User.findByPk(id);
      foundUser.isDelete = true;
      foundUser.save();
      res.status(202).send({
        status: "success",
        message: "Delete customer successfully!",
      });
    } catch (err) {
      res.status(500).send({
        status: "fail",
        message: "Server is working wrong!",
      });
    }
  }
  public static async updatePersonalInfoByID(req: Request, res: Response) {
    try {
      const {
        user_code,
        user_name,
        user_phone,
        user_email,
        customer_status,
        staff_id,
        staff_in_charge_note,
        tags,
      } = req.body;

      const { id } = req.params;

      const foundUser = await User.findByPk(id);
      const foundCustomer = await Customer.findOne({
        where: {
          user_id: foundUser.id,
        },
      });

      const userRowUpdated: User = handleFormatUpdateDataByValidValue(
        {
          user_code,
          user_name,
          user_phone,
          user_email,
        },
        foundUser.dataValues
      );
      const customerRowUpdated: Customer = handleFormatUpdateDataByValidValue(
        {
          customer_status,
          staff_id,
          staff_in_charge_note,
          tags,
        },
        foundCustomer.dataValues
      );

      await User.update(userRowUpdated, {
        where: {
          id,
        },
      });

      await Customer.update(customerRowUpdated, {
        where: {
          user_id: foundUser.id,
        },
      });

      res.status(202).send({
        status: "success",
        message: "Update successfully!",
      });
    } catch (err) {
      res.status(500).send({
        status: "error",
        message: "Server is working wrong!",
      });
    }
  }
  public static async addNewAddressByCustomerID(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { user_province, user_district, user_specific_address } = req.body;

      interface NewAddressAttributes {
        user_province: string;
        user_district: string;
        user_specific_address: string;
        user_id: string;
      }

      const newAddressRow: NewAddressAttributes = {
        user_id: id,
        user_province,
        user_district,
        user_specific_address,
      };

      await UserAddress.create(newAddressRow);
      res.status(201).send({
        status: "success",
        message: "Add new address successfully!",
      });
    } catch (err) {
      res.status(500).send({
        status: "fail",
        message: "Server is working wrong!",
      });
    }
  }
}

module.exports = CustomerController;
