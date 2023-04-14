import { NextFunction, Request, Response } from "express";
import { User } from "../src/ts/types/type";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import db from "../models";

dotenv.config();

class AuthController {
  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        phone,
        password,
      }: {
        phone: string;
        password: string;
      } = req.body;

      const foundUser: {
        dataValues: User;
      } = await db.User.findOne({
        where: {
          user_phone: phone,
        },
      });
      // ? Check user is exist or not by phone
      if (foundUser) {
        // * Case Exist
        const isMatchPassword: boolean =
          foundUser.dataValues.user_password === password;
        switch (isMatchPassword) {
          case true: {
            const { id, user_name } = foundUser.dataValues;

            const tokenPayload: {
              id: string | undefined;
              user_name: string | undefined;
            } = {
              id,
              user_name,
            };

            const jwtSecretKey: string =
              process.env.JWT_TOKEN_SECRET_KEY ?? "default is string";
            const token = jwt.sign(tokenPayload, jwtSecretKey, {
              expiresIn: "3d",
            });

            res.status(201).send({
              status: "Login Success",
              token,
            });
            break;
          }
          case false: {
            res.status(403).send({
              status: "Fail",
              message: `Password is in-correct ! Please check it and try again!`,
            });
            break;
          }
        }
      } else {
        // * Case does not exist
        res.status(404).send({
          status: "Not found",
          message: `User with phone: ${phone} doesn't exist ! Please check it and try again!`,
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;
