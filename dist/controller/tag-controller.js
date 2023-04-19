"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { v4: uuidv4 } = require("uuid");
const models_1 = __importDefault(require("../models"));
const { Tag, CustomerTag } = models_1.default;
const common_1 = require("../src/common");
class TagController {
    static async getAll(req, res, next) {
        try {
            const tagList = await Tag.findAll();
            res.status(200).send({
                status: "Success",
                data: tagList,
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async create(req, res, next) {
        try {
            const { tag_title, tag_description } = req.body;
            const foundTag = await Tag.findOne({
                where: {
                    tag_title,
                },
            });
            if (foundTag) {
                res.status(409).send({
                    status: "Conflict",
                    message: "Tag is already exist!",
                });
            }
            else {
                const tagID = uuidv4();
                const newTagRow = {
                    id: tagID,
                    tag_title,
                    tag_description,
                };
                await Tag.create(newTagRow);
                res.status(201).send({
                    status: "Success",
                    message: "Create tag successfully!",
                });
            }
        }
        catch (err) {
            next(err);
        }
    }
    static async updateByID(req, res, next) {
        try {
            const { id } = req.params;
            const { tag_title, tag_description } = req.body;
            const foundTag = await Tag.findOne({
                where: {
                    id,
                },
            });
            const tagRowUpdate = (0, common_1.handleFormatUpdateDataByValidValue)({
                tag_title,
                tag_description,
            }, foundTag.dataValues);
            await Tag.update(tagRowUpdate, {
                where: {
                    id,
                },
            });
            res.status(202).send({
                status: "Success",
                message: "Update tag success",
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async deleteByID(req, res, next) {
        try {
            const { id } = req.params;
            await CustomerTag.destroy({
                where: {
                    tag_id: id,
                },
            });
            await Tag.destroy({
                where: {
                    id,
                },
            });
            res.status(201).send({
                status: "Success",
                message: "Delete tag successfully!",
            });
        }
        catch (err) {
            next(err);
        }
    }
}
module.exports = TagController;
