import { IncomingHttpHeaders } from "http2";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

interface MyCustomsHeaders {
  token: string;
}

type IncomingCustomHeaders = IncomingHttpHeaders & MyCustomsHeaders;

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const JWT_TOKEN_SECRET_KEY: string =
    process.env.JWT_TOKEN_SECRET_KEY ?? "default is string";
  try {
    const { token } = req.headers as IncomingCustomHeaders;

    const isAuth = jwt.verify(token, JWT_TOKEN_SECRET_KEY);
    if (isAuth) {
      return next();
    } else {
      res.status(403).send({
        status: "Forbidden",
        message: "Client-Error ?? In-Valid Token",
      });
    }
  } catch (err) {
    res.status(500).send({
      status: "Fail",
      message: "You are not logged in!",
    });
  }
};
export default authenticate;
