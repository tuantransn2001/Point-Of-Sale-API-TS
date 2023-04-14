import { NextFunction, Request, Response } from "express";
const { v4: uuidv4 } = require("uuid");
import db from "../models";
const { Customer, User, UserAddress } = db;
import { User, Customer, Address } from "../src/ts/types/type";
import {
  handleFormatCustomer,
  handleFormatUpdateDataByValidValue,
} from "../src/common";
interface NewAddressAttributes {
  user_province: string;
  user_district: string;
  user_specific_address: string;
  user_id?: string;
}
class UserAddressController {
  public static async addNewAddressByUserID(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { user_province, user_district, user_specific_address } = req.body;

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
  public static async updateAddressByID(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { user_province, user_district, user_specific_address } = req.body;

      const foundAddress = await UserAddress.findByPk(id);
      const updateAddressRow: Address = handleFormatUpdateDataByValidValue(
        {
          user_province,
          user_district,
          user_specific_address,
        },
        foundAddress.dataValues
      );

      await UserAddress.update(updateAddressRow, {
        where: {
          id,
        },
      });

      res.status(201).send({
        status: "Success",
        message: "Update Success",
      });
    } catch (err) {
      next(err);
    }
  }
  public static async deleteAddressByID(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      await UserAddress.destroy({
        where: {
          id,
        },
      });

      res.status(201).send({
        status: "success",
        message: "Delete successfully address",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserAddressController;
