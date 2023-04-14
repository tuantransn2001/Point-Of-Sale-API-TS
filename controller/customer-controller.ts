import { NextFunction, Request, Response } from "express";
const { v4: uuidv4 } = require("uuid");
import db from "../models";
const { Customer, User, UserAddress } = db;
import {
  handleFormatCustomer,
  handleFormatUpdateDataByValidValue,
} from "../src/common";
import {
  UserAddressAttributes,
  CustomerAttributes,
  UserAttributes,
} from "../src/ts/interfaces/app_interfaces";
class CustomerController {
  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userCustomerList = await User.findAll({
        where: {
          isDelete: null,
          user_type: "customer",
        },
        include: [
          {
            model: Customer,
          },
          {
            model: UserAddress,
          },
        ],
      });

      res.status(200).send({
        status: "success",
        data: handleFormatCustomer(userCustomerList, "isArray"),
      });
    } catch (err) {
      next(err);
    }
  }
  public static async getByID(req: Request, res: Response, next: NextFunction) {
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
          {
            model: UserAddress,
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

      res.status(200).send({
        status: "success",
        data: handleFormatCustomer(foundCustomer, "isObject"),
      });
    } catch (err) {
      next(err);
    }
  }
  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        user_name,
        user_code,
        user_phone,
        user_email,
        customer_status,
        address_list,
        staff_id,
        staff_in_charge_note,
        tags,
      } = req.body;

      const userID: string = uuidv4();
      const newUserRow: UserAttributes = {
        id: userID,
        user_code,
        user_phone,
        user_email,
        user_name,
        user_type: "customer",
        isDelete: null,
      };

      const newCustomerRow: CustomerAttributes = {
        user_id: newUserRow.id,
        staff_id,
        staff_in_charge_note,
        tags,
        customer_status,
      };

      const userAddressArray: Array<UserAddressAttributes> = address_list.map(
        (address: UserAddressAttributes) => {
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

      if (newUserRow && newCustomerRow && userAddressArray) {
        await User.create(newUserRow);
        await Customer.create(newCustomerRow);
        await UserAddress.bulkCreate(userAddressArray);

        res.status(201).send({
          status: "Success",
          message: "Created successfully!",
        });
      } else {
        res.status(409).send({
          status: "Fail",
          message:
            "Create new customer fail - Please check request and try again!",
        });
      }
    } catch (err) {
      // TODO: ID Sai
      console.log(err);
      // next(err);
    }
  }
  public static async deleteByID(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
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
      next(err);
    }
  }
  public static async updatePersonalInfoByID(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
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

      const userRowUpdated: UserAddressAttributes =
        handleFormatUpdateDataByValidValue(
          {
            user_code,
            user_name,
            user_phone,
            user_email,
          },
          foundUser.dataValues
        );
      const customerRowUpdated: CustomerAttributes =
        handleFormatUpdateDataByValidValue(
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
      next(err);
    }
  }
  public static async addNewAddressByCustomerID(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
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
      next(err);
    }
  }
}

module.exports = CustomerController;
