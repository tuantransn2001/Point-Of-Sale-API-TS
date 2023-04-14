"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routers_1 = __importDefault(require("../routers"));
const seeders_1 = require("./data/seeders");
const models_1 = __importDefault(require("../models"));
const { User, Customer, UserAddress, AgencyBranches, Role, Staff, StaffAgencyBranchInCharge, StaffRole, } = models_1.default;
dotenv_1.default.config();
const app = (0, express_1.default)();
const ROOT_URL = (_a = process.env.BASE_URL) !== null && _a !== void 0 ? _a : "default is string";
const PORT = (_b = process.env.PORT) !== null && _b !== void 0 ? _b : "default is string";
app.use(express_1.default.json()); // ? Converted Data into JSON type - Important
app.use(ROOT_URL, routers_1.default); // ? Router Set up
(async () => {
    await models_1.default.sequelize.sync({ force: true }).then(() => {
        [
            {
                Model: User,
                data: seeders_1.USER_ARRAY,
            },
            {
                Model: Customer,
                data: seeders_1.CUSTOMER_ARRAY,
            },
            {
                Model: Staff,
                data: seeders_1.STAFF_ARRAY,
            },
            {
                Model: UserAddress,
                data: seeders_1.USER_ADDRESS_LIST_ARRAY,
            },
            {
                Model: AgencyBranches,
                data: seeders_1.AGENCY_BRANCH_ARRAY,
            },
            {
                Model: Role,
                data: seeders_1.ROLE_ARRAY,
            },
            {
                Model: StaffRole,
                data: seeders_1.STAFF_ROLE_ARRAY,
            },
            {
                Model: StaffAgencyBranchInCharge,
                data: seeders_1.STAFF_AGENCY_INCHARGE_ARRAY,
            },
        ].forEach(async ({ Model, data }) => {
            await Model.bulkCreate(data);
        });
        app.listen(PORT, () => {
            console.log("Connected - Synchronous Database Success");
            console.log(`Server is running http://localhost:${PORT}`);
        });
    });
})();
