"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleSeedData = async (Model, dataSeed) => {
    await Model.bulkCreate(dataSeed);
};
exports.default = handleSeedData;
