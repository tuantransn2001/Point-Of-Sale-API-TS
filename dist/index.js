"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routers_1 = __importDefault(require("./routers"));
const seeders_1 = require("./src/data/seeders");
const models_1 = __importDefault(require("./models"));
const { User, Customer, UserAddress, AgencyBranches, Role, Staff, StaffAgencyBranchInCharge, StaffRole, Tag, CustomerTag, Price, } = models_1.default;
dotenv_1.default.config();
const app = (0, express_1.default)();
const ROOT_URL = process.env.BASE_URL;
const PORT = process.env.PORT;
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
                Model: Tag,
                data: seeders_1.TAG_ARRAY,
            },
            {
                Model: CustomerTag,
                data: seeders_1.CUSTOMER_TAG_LIST_ARRAY,
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
            { Model: Price, data: seeders_1.PRICE_ARRAY },
        ].forEach(async ({ Model, data }) => {
            await Model.bulkCreate(data);
        });
        app.listen(PORT, () => {
            console.log("Connected - Synchronous Database Success");
            console.log(`Server is running http://localhost:${PORT}`);
        });
    });
})();
