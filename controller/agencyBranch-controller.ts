import { Request, Response } from "express";
import db from "../models";
const { AgencyBranch } = db;
import { handleFormatUpdateDataByValidValue } from "../src/common";
import { AgencyBranchAttributes } from "../src/common/type";
class AgencyController {
  static async getAll(req: Request, res: Response) {
    try {
      const agencyBranchList: Array<AgencyBranchAttributes> =
        await AgencyBranch.findAll();
      res.status(200).send({
        status: "success",
        data: agencyBranchList,
      });
    } catch (err) {
      res.status(500).send({
        status: "error",
        message: "Server is working wrong!",
      });
    }
  }
  static async create(req: Request, res: Response) {
    try {
      const {
        agency_branch_code,
        agency_branch_name,
        agency_branch_phone,
        agency_branch_address,
        agency_branch_area,
        agency_branch_expiration_date,
        agency_branch_status,
        isDefaultCN,
      } = req.body;

      const targetAgencyCode: string = agency_branch_code;

      const foundAgencyBranch = await AgencyBranch.findOne({
        where: {
          agency_branch_code: targetAgencyCode,
        },
      });

      if (foundAgencyBranch) {
        res
          .status(406)
          .send(
            "Agency Branchs has been already exists! Please check CN_code and try again!"
          );
      } else {
        const targetIsDefaultCN: boolean = true;
        if (isDefaultCN) {
          await AgencyBranch.update(
            {
              isDefaultCN: !targetIsDefaultCN,
            },
            {
              where: {
                isDefaultCN: targetIsDefaultCN,
              },
            }
          );
        }
        const newAgencyBranchRow: {
          agency_branch_code: string;
          agency_branch_name: string;
          agency_branch_phone: string;
          agency_branch_address: string;
          agency_branch_area: string;
          agency_branch_expiration_date: string;
          agency_branch_status: string;
          isDefaultCN: string;
        } = {
          agency_branch_code,
          agency_branch_name,
          agency_branch_phone,
          agency_branch_address,
          agency_branch_area,
          agency_branch_expiration_date,
          agency_branch_status,
          isDefaultCN,
        };

        const newAgencyBrach: AgencyBranchAttributes =
          await AgencyBranch.create(newAgencyBranchRow);

        res.status(201).send({
          status: "Success",
          message: "Create successfully",
          newAgencyBrach,
        });
      }
    } catch (err) {
      res.status(500).send({
        status: "error",
        message: "Server is working wrong!",
      });
    }
  }
  static async updateByID(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        isDefaultCN,
        agency_branch_code,
        agency_branch_name,
        agency_branch_phone,
        agency_branch_address,
        agency_branch_area,
        agency_branch_expiration_date,
        agency_branch_status,
      } = req.body;

      const targetAgencyID: string = id;
      const foundAgencyBranch: {
        dataValues: AgencyBranchAttributes;
      } = await AgencyBranch.findOne({
        where: {
          id: targetAgencyID,
        },
      });

      if (isDefaultCN) {
        const targetIsDefaultCN: boolean = true;
        await AgencyBranch.update(
          {
            isDefaultCN: !targetIsDefaultCN,
          },
          {
            where: {
              isDefaultCN: targetIsDefaultCN,
            },
          }
        );
      }

      const updateAgencyBrach: AgencyBranchAttributes =
        handleFormatUpdateDataByValidValue(
          {
            isDefaultCN,
            agency_branch_code,
            agency_branch_name,
            agency_branch_phone,
            agency_branch_address,
            agency_branch_area,
            agency_branch_expiration_date,
            agency_branch_status,
          },
          foundAgencyBranch.dataValues
        );

      const agencyBranchUpdated: AgencyBranchAttributes =
        await AgencyBranch.update(updateAgencyBrach, {
          where: {
            id: targetAgencyID,
          },
        });

      res.status(202).send({
        status: "success",
        message: "Update successfully!",
        agencyBranchUpdated,
      });
    } catch (err) {
      res.status(500).send("Server is working wrong!");
    }
  }
}

module.exports = AgencyController;
