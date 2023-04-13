"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("../routers/auth-router"));
const seed_data_router_1 = __importDefault(require("../routers/seed-data-router"));
const customer_router_1 = __importDefault(require("../routers/customer-router"));
const staff_router_1 = __importDefault(require("../routers/staff-router"));
const agencyBranch_router_1 = __importDefault(require("../routers/agencyBranch-router"));
const userAddress_router_1 = __importDefault(require("./userAddress-router"));
const rootRouter = (0, express_1.Router)();
rootRouter.use("/auth", auth_router_1.default); // ? => Done
rootRouter.use("/customer", customer_router_1.default); // ? => Done
rootRouter.use("/address", userAddress_router_1.default); // ? => Done
rootRouter.use("/seed", seed_data_router_1.default); // ? => Done
rootRouter.use("/agency-branch", agencyBranch_router_1.default); // ? => Done
rootRouter.use("/staff", staff_router_1.default); // ! => Developing
exports.default = rootRouter;
