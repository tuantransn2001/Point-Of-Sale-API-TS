"use strict";
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
        password: process.env.DB_PW,
        database: process.env.DB_NAME,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
        username: "postgres",
        host: "127.0.0.1",
    },
    production: {
        password: process.env.DB_PW,
        database: process.env.DB_NAME,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
        username: "postgres",
        host: "127.0.0.1",
    },
};
