const randomstring = require("randomstring");
const { v4: uuidv4 } = require("uuid");
function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const A_B_ARRAY = [
  {
    id: uuidv4(),
    agency_branch_name: "LCD",
    agency_branch_code: "CN1",
    agency_branch_phone: "0706952905",
    agency_branch_address:
      "40-42 đường B (Trần Thị Vững), KDC Him Lam Phú Đông, KP Bình Đường 3",
    agency_branch_area: "Bình Dương - Thành phố Dĩ An",
    agency_branch_expiration_date: new Date(),
    agency_branch_status: "active",
    isDefaultCN: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    agency_branch_name: "BẢO HÀNH",
    agency_branch_code: "CN2",
    agency_branch_phone: "0706952905",
    agency_branch_address:
      "40-42 đường B (Trần Thị Vững), KDC Him Lam Phú Đông, KP Bình Đường 3",
    agency_branch_area: "Bình Dương - Thành phố Dĩ An",
    agency_branch_expiration_date: new Date(),
    agency_branch_status: "active",
    isDefaultCN: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    agency_branch_name: "TRUNG TÂM SỬA CHỮA",
    agency_branch_code: "CN2",
    agency_branch_phone: "0706952905",
    agency_branch_address:
      "40-42 đường B (Trần Thị Vững), KDC Him Lam Phú Đông, KP Bình Đường 3",
    agency_branch_area: "Bình Dương - Thành phố Dĩ An",
    agency_branch_expiration_date: new Date(),
    agency_branch_status: "active",
    isDefaultCN: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
const U_ARRAY = [
  {
    id: uuidv4(),
    user_name: "Trần Thái Tuấn",
    user_type: "admin",
    user_phone: "0987546325",
    user_email: "admin@gmail.com",
    user_password: "mhkadmin@123",
    user_code: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
const C_ARRAY = new Array();
const U_C_ARRAY = new Array();
const C_ADDRESS_LIST = new Array();
const C_ARRAY_LENGTH = 51;

const randomAgencyBranchID = (): string => {
  const randomID: string = A_B_ARRAY.map(({ id }) => id)[
    randomIntFromInterval(0, 2)
  ];
  return randomID;
};

for (let index = 1; index <= C_ARRAY_LENGTH; index++) {
  const c_number = randomstring.generate({
    charset: "numeric",
    length: 9,
  });
  const c_email = randomstring.generate({
    length: 8,
  });
  const c_code = randomstring.generate({
    charset: "alphanumeric",
    length: 4,
  });

  const newUSer = {
    id: uuidv4(),
    user_name: `Khách hàng ${uuidv4()}`,
    user_type: "customer",
    user_phone: `0${c_number}`,
    user_email: `${c_email}@gmail.com`,
    user_password: c_email,
    user_code: c_code,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const newCustomer = {
    id: uuidv4(),
    // TODO: Chưa có dữ liệu nên dùng tạm.
    staff_id: uuidv4(),
    staff_in_charge_note: "Be carefull to change data!",
    customer_status: "Đang giao dịch",
    tags: "Lazada",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const newUserCustomerItem = {
    id: uuidv4(),
    customer_id: newCustomer.id,
    user_id: newUSer.id,
    user_customer_list_note: "Created by staff",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const newCAddressItem = {
    id: uuidv4(),
    customer_id: newCustomer.id,
    customer_province: "Hồ Chí Minh",
    customer_district: "Quận Bình Tân",
    customer_address: "Phường 4",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  U_ARRAY.push(newUSer);
  C_ARRAY.push(newCustomer);
  U_C_ARRAY.push(newUserCustomerItem);
  C_ADDRESS_LIST.push(newCAddressItem);
}

const ST_ARRAY_LENGTH = 99;
const ST_ARRAY = new Array();
const ST_ROLE = new Array();
const ST_A_INCHARGE = new Array();
const U_ST_ARRAY = new Array();

for (let index = C_ARRAY_LENGTH; index <= ST_ARRAY_LENGTH; index++) {
  const randomStringID = uuidv4();
  const c_number = randomstring.generate({
    charset: "numeric",
    length: 9,
  });
  const c_email = randomstring.generate({
    length: 8,
  });
  const c_code = randomstring.generate({
    charset: "alphanumeric",
    length: 4,
  });
  const randomRole = randomstring.generate({
    charset: "numeric",
    length: 8,
  });

  const newUSer = {
    id: randomStringID,
    user_name: `Nhân viên ${randomStringID}`,
    user_type: "staff",
    user_phone: `0${c_number}`,
    user_email: `${c_email}@gmail.com`,
    user_password: c_email,
    user_code: c_code,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const newStaff = {
    id: randomStringID,
    staff_status: "Đang làm việc",
    staff_birthday: new Date(),
    note_about_staff: "Nhân viên mới",
    staff_gender: "male",
    staff_province: "Hà Nội",
    staff_district: "Quận Tân Bình",
    staff_address: "Phường Linh Trung Quận Thủ Đức",
    isAllowViewImportNWholesalePrice: false,
    isAllowViewShippingPrice: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const userStaffItem = {
    id: randomStringID,
    staff_id: newStaff.id,
    user_id: newUSer.id,
    user_staff_list_note: "Be carefully",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const newStaffRole = {
    id: randomStringID,
    staff_id: newStaff.id,
    staff_role: `Nhân viên ${randomRole}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const PositionAgencyInCharge = {
    id: randomStringID,
    staff_role_id: newStaffRole.id,
    agency_branch_id: randomAgencyBranchID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  U_ARRAY.push(newUSer);
  U_ST_ARRAY.push(userStaffItem);
  ST_ARRAY.push(newStaff);
  ST_ROLE.push(newStaffRole);
  ST_A_INCHARGE.push(PositionAgencyInCharge);
}

export {
  U_ARRAY,
  C_ARRAY,
  U_C_ARRAY,
  C_ADDRESS_LIST,
  ST_ARRAY,
  ST_ROLE,
  ST_A_INCHARGE,
  U_ST_ARRAY,
  A_B_ARRAY,
};
