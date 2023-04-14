import { Response, NextFunction } from "express";
import { MyRequest } from "../../src/ts/interfaces/global_interfaces";
import { IncomingHttpHeaders } from "http2";
import db from "../../models";
interface MyCustomsHeaders {
  token: string;
}

type IncomingCustomHeaders = IncomingHttpHeaders & MyCustomsHeaders;

const authorize = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    const authorizeArr = ["admin"];
    const userID = req.currentUserID;
    const foundUser = await db.User.findByPk(userID);
    const isAdmin = authorizeArr.includes(foundUser.dataValues.user_type);
    if (isAdmin) {
      return next();
    } else {
      res
        .status(406)
        .send({ status: "Not Acceptable", message: "You are not Admin!!" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export default authorize;
