import { Request, Response } from "express";
import db from "../models";
const { StaffRole, Staff, User, StaffAgencyBranchInCharge, UserAddress } = db;
import { handleFormatStaff } from "../src/common";
class StaffController {
  public static async getAll(req: Request, res: Response) {
    try {
      const userStaffList = await User.findAll({
        where: {
          isDelete: null,
          user_type: "staff",
        },
        include: [
          {
            model: Staff,
            include: [
              {
                model: StaffRole,
                include: [
                  {
                    model: StaffAgencyBranchInCharge,
                  },
                ],
              },
            ],
          },
          {
            model: UserAddress,
          },
        ],
      });
      res.status(200).send({
        status: "success",
        data: handleFormatStaff(userStaffList, "isArray"),
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server is working wrong!");
    }
  }
  //   static async create(req, res) {
  //     try {
  //       const {
  //         user_phone,
  //         user_email,
  //         user_name,
  //         user_code,
  //         staff_password,
  //         staff_status,
  //         staff_gender,
  //         staff_region,
  //         staff_commune,
  //         staff_address,
  //         note_about_staff,
  //         isAllowViewImportNWholesalePrice,
  //         isAllowViewShippingPrice,
  //         positionIncludeAgencyBranchInCharge,
  //       } = req.body;

  //       // ? Create Users
  //       const newUserRecord = {
  //         user_name,
  //         user_code,
  //         user_phone,
  //         user_email,
  //         user_password: staff_password,
  //         isDelete: null,
  //         user_type: "staff",
  //       };
  //       const newUser = await Users.create(newUserRecord);
  //       // ? Create Staffs
  //       const newStaffRecord = {
  //         staff_status,
  //         staff_birthday: new Date(),
  //         staff_address,
  //         staff_gender,
  //         staff_region,
  //         staff_commune,
  //         note_about_staff,
  //         isAllowViewImportNWholesalePrice,
  //         isAllowViewShippingPrice,
  //       };
  //       const newStaff = await Staffs.create(newStaffRecord);
  //       // ? Create UserStaffList
  //       const newUserStaffListRecord = {
  //         staff_id: newStaff.dataValues.id,
  //         user_id: newUser.dataValues.id,
  //         user_staff_list_note: "create by admin",
  //       };
  //       const newUserStaffList = await UserStaffList.create(
  //         newUserStaffListRecord
  //       );
  //       // ? Create StaffPositions
  //       const newStaffPositionRecord = positionIncludeAgencyBranchInCharge.map(
  //         ({ title }) => ({
  //           staff_id: newStaff.dataValues.id,
  //           staff_title: title,
  //         })
  //       );
  //       const newStaffPosition = await StaffPositions.bulkCreate(
  //         newStaffPositionRecord
  //       );
  //       // ? Create StaffAgencyBranchInCharge
  //       positionIncludeAgencyBranchInCharge.forEach(
  //         ({ title, agencyInChargeIDList }) => {
  //           (async () => {
  //             await StaffPositions.findOne({
  //               where: {
  //                 staff_title: title,
  //                 staff_id: newStaff.dataValues.id,
  //               },
  //             }).then((response) => {
  //               let targetStaffPositionID = response.dataValues.id;

  //               const newStaffAgencyBranchInChargeRecordArray =
  //                 agencyInChargeIDList.map((id) => ({
  //                   staff_position_id: targetStaffPositionID,
  //                   agency_branch_id: id,
  //                 }));

  //               (async () => {
  //                 if (newStaffAgencyBranchInChargeRecordArray.length === 1) {
  //                   await StaffAgencyBranchInCharge.create(
  //                     newStaffAgencyBranchInChargeRecordArray[0]
  //                   );
  //                 } else {
  //                   await StaffAgencyBranchInCharge.bulkCreate(
  //                     newStaffAgencyBranchInChargeRecordArray
  //                   );
  //                 }
  //               })();
  //             });
  //           })();
  //         }
  //       );

  //       res.status(201).send({
  //         status: "success",
  //         message: "create new staff successfully",
  //       });
  //     } catch (err) {
  //       res.status(500).send("Server is working wrong!");
  //     }
  //   }
  //   static async updateByID(req, res) {
  //     try {
  //       const { id } = req.params;
  //       const {
  //         user_name,
  //         user_phone,
  //         user_email,
  //         staff_birthday,
  //         staff_gender,
  //         staff_region,
  //         staff_commune,
  //         staff_address,
  //       } = req.body;

  //       const foundStaff = await Staffs.findOne({
  //         where: {
  //           id,
  //         },
  //       });

  //       const foundUserStaffList = await UserStaffList.findOne({
  //         where: {
  //           staff_id: id,
  //         },
  //       });

  //       const foundUser = await Users.findOne({
  //         where: {
  //           id: foundUserStaffList.dataValues.user_id,
  //         },
  //       });

  //       const updateStaff = await foundStaff.update(
  //         handleFormatUpdateDataByValidValue(
  //           {
  //             staff_birthday: new Date(),
  //             staff_gender,
  //             staff_region,
  //             staff_commune,
  //             staff_address,
  //           },
  //           foundStaff.dataValues
  //         )
  //       );

  //       const updateUser = await foundUser.update(
  //         handleFormatUpdateDataByValidValue(
  //           { user_name, user_phone, user_email },
  //           foundUser.dataValues
  //         )
  //       );

  //       res.send({
  //         status: "success",
  //         message: "Update staff success",
  //       });
  //     } catch (err) {
  //       res.status(500).send("Server is working wrong!");
  //     }
  //   }
  //   static async getByID(req, res) {
  //     try {
  //       const { id } = req.params;
  //       const staffList = await UserStaffList.findOne({
  //         include: [
  //           {
  //             model: Users,
  //           },
  //           {
  //             model: Staffs,
  //           },
  //         ],
  //         where: {
  //           staff_id: id,
  //         },
  //       });

  //       const staffPositionIncludeAgencyInchargeList =
  //         await StaffAgencyBranchInCharge.findAll({
  //           include: [
  //             {
  //               model: StaffPositions,
  //             },
  //             {
  //               model: AgencyBranchs,
  //             },
  //           ],
  //         });

  //       res.status(200).send({
  //         status: "success",
  //         data: handleFormatStaffIncludeCheckIsDelete(
  //           staffPositionIncludeAgencyInchargeList,
  //           staffList,
  //           "isObject"
  //         ),
  //       });
  //     } catch (err) {
  //       console.log(err);
  //       res.status(500).send("Server is working wrong!");
  //     }
  //   }
  //   static async deleteByID(req, res) {
  //     try {
  //       const { id } = req.params;

  //       const foundStaffList = await UserStaffList.findAll({
  //         include: [
  //           {
  //             model: Users,
  //           },
  //           {
  //             model: Staffs,
  //           },
  //         ],
  //         where: {
  //           staff_id: id,
  //         },
  //       });

  //       const targetUserID = foundStaffList[0].User.dataValues.id;

  //       const foundStaff = await Users.findOne({
  //         where: {
  //           id: targetUserID,
  //         },
  //       });

  //       foundStaff.isDelete = true;
  //       foundStaff.save();

  //       res.status(201).send({
  //         status: "success",
  //         message: "Delete staff success",
  //       });
  //     } catch (err) {
  //       res
  //         .status(500)
  //         .send({ status: "fail", message: "Server is working wrong!" });
  //     }
  //   }
  //   static async updateRoleByStaffIDAndPositionID(req, res) {
  //     try {
  //       const { id } = req.params;
  //       const { positionIncludeAgencyBranchInCharge } = req.body;

  //       if (positionIncludeAgencyBranchInCharge.length === 0) {
  //         // ? Delete all old data
  //         const positionList = await StaffPositions.findAll({
  //           where: {
  //             staff_id: id,
  //           },
  //         });

  //         positionList.forEach((position) => {
  //           const positionID = position.dataValues.id;

  //           // ? Delete

  //           (async () => {
  //             await StaffPositions.destroy({
  //               where: { id: positionID },
  //             });
  //           })();
  //           // ? Find AC InCharge
  //           (async () => {
  //             const foundAC = await StaffAgencyBranchInCharge.findOne({
  //               where: {
  //                 staff_position_id: positionID,
  //               },
  //             });

  //             const ACInChargeID = foundAC.dataValues.id;

  //             await StaffAgencyBranchInCharge.destroy({
  //               where: { id: ACInChargeID },
  //             });
  //           })();
  //         });
  //       } else {
  //         // ? Delete all old data
  //         const positionList = await StaffPositions.findAll({
  //           where: {
  //             staff_id: id,
  //           },
  //         });

  //         positionList.forEach((position) => {
  //           const positionID = position.dataValues.id;

  //           // ? Delete

  //           (async () => {
  //             await StaffPositions.destroy({
  //               where: { id: positionID },
  //             });
  //           })();
  //           // ? Find AC InCharge
  //           (async () => {
  //             const foundAC = await StaffAgencyBranchInCharge.findOne({
  //               where: {
  //                 staff_position_id: positionID,
  //               },
  //             });

  //             const ACInChargeID = foundAC.dataValues.id;

  //             await StaffAgencyBranchInCharge.destroy({
  //               where: { id: ACInChargeID },
  //             });
  //           })();
  //         });

  //         // ? Create StaffPositions
  //         const newStaffPositionRecord = positionIncludeAgencyBranchInCharge.map(
  //           ({ title }) => ({
  //             staff_id: id,
  //             staff_title: title,
  //           })
  //         );

  //         await StaffPositions.bulkCreate(newStaffPositionRecord);
  //         // ? Create StaffAgencyBranchInCharge
  //         positionIncludeAgencyBranchInCharge.forEach(
  //           ({ title, agencyInChargeIDList }) => {
  //             (async () => {
  //               await StaffPositions.findOne({
  //                 where: {
  //                   staff_title: title,
  //                   staff_id: id,
  //                 },
  //               }).then((response) => {
  //                 const targetStaffPositionID = response.dataValues.id;

  //                 const newStaffAgencyBranchInChargeRecordArray =
  //                   agencyInChargeIDList.map((ID) => ({
  //                     staff_position_id: targetStaffPositionID,
  //                     agency_branch_id: ID,
  //                   }));

  //                 (async () => {
  //                   await StaffAgencyBranchInCharge.bulkCreate(
  //                     newStaffAgencyBranchInChargeRecordArray
  //                   );
  //                 })();
  //               });
  //             })();
  //           }
  //         );
  //       }
  //       res.send({ status: "success", message: "update success" });
  //     } catch (err) {
  //       res.status(500).send("Server is working wrong!");
  //     }
  //   }
}
module.exports = StaffController;
