"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = __importDefault(require("../models"));
const routers_1 = __importDefault(require("../routers"));
dotenv_1.default.config();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : "default is string";
const app = (0, express_1.default)();
// ! Converted Data into JSON type - Important
app.use(express_1.default.json());
// ? Router Set up
app.use("/mhk-api/v2/", routers_1.default);
models_1.default.sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log("Connected - Synchronous Database Success");
        console.log(`Server is running test http://localhost:${PORT}`);
    });
});
