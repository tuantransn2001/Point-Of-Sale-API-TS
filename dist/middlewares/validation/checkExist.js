"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkExist = (Model) => async (req, res, next) => {
    try {
        const { id } = req.params;
        const foundItem = await Model.findOne({
            where: {
                id,
            },
        });
        if (foundItem) {
            next();
        }
        else {
            res
                .status(404)
                .send({ status: "Not found", message: "Check By Middleware" });
        }
    }
    catch (err) {
        res.status(500).send({
            status: "err",
            message: "Check exist middleware is working wrong!",
        });
    }
};
exports.default = checkExist;
