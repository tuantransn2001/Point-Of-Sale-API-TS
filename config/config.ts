require("dotenv").config();
module.exports = {
  development: {
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    username: "postgres",
    host: "127.0.0.1",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
