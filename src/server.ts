import express, { Express } from "express";
import dotenv from "dotenv";
import db from "../models";
import rootRouter from "../routers";

dotenv.config();

const PORT: string = process.env.PORT ?? "default is string";
const app: Express = express();

// ! Converted Data into JSON type - Important
app.use(express.json());
// ? Router Set up
app.use("/mhk-api/v2/", rootRouter);

db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log("Connected - Synchronous Database Success");
    console.log(`Server is running http://localhost:${PORT}`);
  });
});
