import { NextFunction, Request, Response } from "express";
const { v4: uuidv4 } = require("uuid");
import { PriceAttributes } from "../src/ts/interfaces/app_interfaces";
import db from "../models";
import { handleFormatUpdateDataByValidValue } from "../src/common";
const { Price } = db;
class PriceController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const priceList = await Price.findAll();

      res.status(200).send({
        status: "Success",
        data: priceList,
      });
    } catch (err) {
      next(err);
    }
  }
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { price_type, price_description, isImportDefault, isSellDefault } =
        req.body;

      const foundPrice = await Price.findOne({
        where: {
          price_type,
        },
      });

      if (foundPrice) {
        res.status(409).send({
          status: "Conflict",
          message:
            "Create new customer fail - Please check request and try again!",
        });
      } else {
        if (isImportDefault | isSellDefault) {
          const whereConditionArray: Array<
            | Omit<
                PriceAttributes,
                "id" | "price_type" | "price_description" | "isImportDefault"
              >
            | Omit<
                PriceAttributes,
                "id" | "price_type" | "price_description" | "isSellDefault"
              >
          > = [
            {
              isSellDefault,
            },
            {
              isImportDefault,
            },
          ];

          whereConditionArray.forEach(async (whereCondition, index) => {
            if (Object.values(whereCondition)[0]) {
              const foundDefaultPrice = await Price.findOne({
                where: whereCondition,
              });

              await foundDefaultPrice.update({
                [Object.keys(whereConditionArray[index])[0]]: false,
              });
            }
          });
        }

        const newPriceRow:
          | Omit<PriceAttributes, "isImportDefault" | "isSellDefault">
          | PriceAttributes = {
          id: uuidv4(),
          price_type,
          price_description,
          isImportDefault,
          isSellDefault,
        };
        await Price.create(newPriceRow);
        res.status(201).send({
          status: "Success",
          message: "Create new price success",
        });
      }
    } catch (err) {
      next(err);
    }
  }
  static async deleteByID(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await Price.destroy({
        where: {
          id,
        },
      });

      res.status(200).send({
        status: "Success",
        message: "Delete Price Successfully",
      });
    } catch (err) {
      next(err);
    }
  }
  static async updateByID(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { price_type, price_description } = req.body;

      const foundPrice = await Price.findOne({
        where: {
          id,
        },
      });

      const updatePriceRow: PriceAttributes =
        handleFormatUpdateDataByValidValue(
          { price_type, price_description },
          foundPrice.dataValues
        );

      await Price.update(updatePriceRow, {
        where: {
          id,
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
}

module.exports = PriceController;
