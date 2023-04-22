require("dotenv").config();
import express, { Express } from "express";
import rootRouter from "../routers";
import cors from "cors";
import db from "../models";
import { handleFakeData } from "./data/handleFakeData";

const app: Express = express();

const ROOT_URL: string = process.env.ROOT_URL as string;
const HOST: string = process.env.HOST as string;
const PORT: string = process.env.PORT as string;

app.use(cors()); // * Allow cors
app.use(express.json()); // * Converted Data into JSON type - !Important
app.use(ROOT_URL, rootRouter); // * Router Set up

(async () => {
  await db.sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
      handleFakeData();
      console.log("Connected - Synchronous Database Success");
      console.log(`🚀 Server is running 🚀 - http://${HOST}:${PORT}`);
    });
  });
})();
