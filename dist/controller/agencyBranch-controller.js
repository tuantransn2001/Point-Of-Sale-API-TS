"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
const { AgencyBranch } = models_1.default;
const common_1 = require("../src/common");
class AgencyController {
    static async getAll(req, res) {
        try {
            const agencyBranchList = await AgencyBranch.findAll();
            res.status(200).send({
                status: "success",
                data: agencyBranchList,
            });
        }
        catch (err) {
            res.status(500).send({
                status: "error",
                message: "Server is working wrong!",
            });
        }
    }
    static async create(req, res) {
        try {
            const { agency_branch_code, agency_branch_name, agency_branch_phone, agency_branch_address, agency_branch_area, agency_branch_expiration_date, agency_branch_status, isDefaultCN, } = req.body;
            const targetAgencyCode = agency_branch_code;
            const foundAgencyBranch = await AgencyBranch.findOne({
                where: {
                    agency_branch_code: targetAgencyCode,
                },
            });
            if (foundAgencyBranch) {
                res
                    .status(406)
                    .send("Agency Branchs has been already exists! Please check CN_code and try again!");
            }
            else {
                const targetIsDefaultCN = true;
                if (isDefaultCN) {
                    await AgencyBranch.update({
                        isDefaultCN: !targetIsDefaultCN,
                    }, {
                        where: {
                            isDefaultCN: targetIsDefaultCN,
                        },
                    });
                }
                const newAgencyBranchRow = {
                    agency_branch_code,
                    agency_branch_name,
                    agency_branch_phone,
                    agency_branch_address,
                    agency_branch_area,
                    agency_branch_expiration_date,
                    agency_branch_status,
                    isDefaultCN,
                };
                const newAgencyBrach = await AgencyBranch.create(newAgencyBranchRow);
                res.status(201).send({
                    status: "Success",
                    message: "Create successfully",
                    newAgencyBrach,
                });
            }
        }
        catch (err) {
            res.status(500).send({
                status: "error",
                message: "Server is working wrong!",
            });
        }
    }
    static async updateByID(req, res) {
        try {
            const { id } = req.params;
            const { isDefaultCN, agency_branch_code, agency_branch_name, agency_branch_phone, agency_branch_address, agency_branch_area, agency_branch_expiration_date, agency_branch_status, } = req.body;
            const targetAgencyID = id;
            const foundAgencyBranch = await AgencyBranch.findOne({
                where: {
                    id: targetAgencyID,
                },
            });
            if (isDefaultCN) {
                const targetIsDefaultCN = true;
                await AgencyBranch.update({
                    isDefaultCN: !targetIsDefaultCN,
                }, {
                    where: {
                        isDefaultCN: targetIsDefaultCN,
                    },
                });
            }
            const updateAgencyBrach = (0, common_1.handleFormatUpdateDataByValidValue)({
                isDefaultCN,
                agency_branch_code,
                agency_branch_name,
                agency_branch_phone,
                agency_branch_address,
                agency_branch_area,
                agency_branch_expiration_date,
                agency_branch_status,
            }, foundAgencyBranch.dataValues);
            const agencyBranchUpdated = await AgencyBranch.update(updateAgencyBrach, {
                where: {
                    id: targetAgencyID,
                },
            });
            res.status(202).send({
                status: "success",
                message: "Update successfully!",
                agencyBranchUpdated,
            });
        }
        catch (err) {
            res.status(500).send("Server is working wrong!");
        }
    }
}
module.exports = AgencyController;
