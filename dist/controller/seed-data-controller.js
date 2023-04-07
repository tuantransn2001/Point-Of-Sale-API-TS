"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSeedData = void 0;
const handleSeedData = (Model, data) => {
    let modelDataList = new Array();
    (async () => {
        await Model.bulkCreate(data).then((res) => {
            console.log("success: ", res);
        });
    })();
    return modelDataList;
};
exports.handleSeedData = handleSeedData;
