const handleGetFirstNameFromFullName = (fullName) => {
  let targetIndex = null;
  for (let index = fullName.length - 1; index >= 0; index--) {
    if (fullName[index] === " ") {
      targetIndex = index + 1;
      break;
    }
  }

  return fullName.slice(targetIndex);
};
const handleFormatCustomerIncludeCheckIsDelete = (
  source,
  sourceExtension,
  sourceType
) => {
  const mySource = [...source];
  if (sourceType === "isArray") {
    return mySource.reduce((result, u_c) => {
      const { user_code, user_phone, user_email, user_name, isDelete } =
        u_c.User.dataValues;
      const {
        id,
        staff_id,
        customer_status,
        staff_in_charge_note,
        tags,
        createdAt,
        updatedAt,
      } = u_c.Customer.dataValues;

      if (!isDelete) {
        const addressList = sourceExtension
          .filter((item) => item.customer_id === id)
          .map(
            ({ id, customer_region, customer_commune, customer_address }) => {
              return {
                id,
                customer_region,
                customer_commune,
                customer_address,
              };
            }
          );

        result.push({
          id,
          staff_id,
          customer_status,
          customer_name: user_name,
          customer_code: user_code,
          customer_phone: user_phone,
          customer_email: user_email,
          staff_id,
          staff_in_charge_note,
          tags,
          customer_addressList: addressList,
          note: u_c.user_customer_list_note,
          createdAt,
          updatedAt,
        });
      }

      return result;
    }, []);
  } else if (sourceType === "isObject") {
    const { user_code, user_phone, user_email, user_name, isDelete } =
      source[0].User.dataValues;
    const { id, staff_id, staff_in_charge_note, tags, createdAt, updatedAt } =
      source[0].Customer.dataValues;

    if (!isDelete) {
      const addressList = sourceExtension
        .filter((item) => item.customer_id === id)
        .map(({ id, customer_region, customer_commune, customer_address }) => {
          return {
            id,
            customer_region,
            customer_commune,
            customer_address,
          };
        });
      return {
        id,
        staff_id,
        customer_name: user_name,
        customer_code: user_code,
        customer_phone: user_phone,
        customer_email: user_email,
        staff_id,
        staff_in_charge_note,
        tags,
        customer_addressList: addressList,
        note: source[0].dataValues.user_customer_list_note,
        createdAt,
        updatedAt,
      };
    }
  }
};
const handleFormatStaffIncludeCheckIsDelete = (
  source,
  sourceExtension,
  sourceType
) => {
  const positionFormat = source.map((positionData) => {
    const { staff_id, staff_title } = positionData.dataValues.StaffPosition;
    const { agency_branch_name } = positionData.dataValues.AgencyBranch;
    return {
      id: positionData.dataValues.id,
      staff_id,
      staff_title,
      agency_branch_name,
    };
  });
  if (sourceType === "isArray") {
    return sourceExtension.reduce((result, u_t) => {
      const { user_name, user_type, user_code, user_phone, user_email } =
        u_t.User;
      const {
        id,
        staff_address,
        staff_status,
        staff_birthday,
        staff_gender,
        staff_region,
        staff_commune,
        note_about_staff,
        isAllowViewImportNWholesalePrice,
        isAllowViewShippingPrice,
      } = u_t.Staff;

      if (!u_t.User.isDelete) {
        result.push({
          id,
          staff_name: user_name,
          staff_type: user_type,
          staff_code: user_code,
          staff_phone: user_phone,
          staff_email: user_email,
          user_staff_list_note: u_t.user_staff_list_note,
          staff_gender,
          staff_region,
          staff_commune,
          staff_status,
          staff_birthday,
          staff_address,
          note_about_staff,
          staff_position: positionFormat
            .filter(({ staff_id }) => staff_id === id)
            .reduce(
              (
                positionResult,
                { id, staff_id, staff_title, agency_branch_name },
                index
              ) => {
                if (index === 0) {
                  positionResult.push({
                    id,
                    staff_id,
                    staff_title,
                    agency_branch_name_list: [agency_branch_name],
                  });
                } else {
                  const titleExistIndex = positionResult.findIndex(
                    (el) => el.staff_title === staff_title
                  );

                  if (titleExistIndex === -1) {
                    positionResult.push({
                      id,
                      staff_id,
                      staff_title,
                      agency_branch_name_list: [agency_branch_name],
                    });
                  } else {
                    positionResult[
                      titleExistIndex
                    ].agency_branch_name_list.push(agency_branch_name);
                  }
                }

                return positionResult;
              },
              []
            ),
          isAllowViewImportNWholesalePrice,
          isAllowViewShippingPrice,
          createdAt: u_t.createdAt,
          updatedAt: u_t.updatedAt,
        });
      }

      return result;
    }, []);
  } else {
    const { user_name, user_type, user_code, user_phone, user_email } =
      sourceExtension.User;
    const {
      id,
      staff_address,
      staff_status,
      staff_birthday,
      staff_gender,
      staff_region,
      staff_commune,
      note_about_staff,
      isAllowViewImportNWholesalePrice,
      isAllowViewShippingPrice,
    } = sourceExtension.Staff;

    if (!sourceExtension.User.isDelete) {
      return {
        id,
        staff_name: user_name,
        staff_type: user_type,
        staff_code: user_code,
        staff_phone: user_phone,
        staff_email: user_email,
        user_staff_list_note: sourceExtension.user_staff_list_note,
        staff_gender,
        staff_region,
        staff_commune,
        staff_status,
        staff_birthday,
        staff_address,
        note_about_staff,
        staff_position: positionFormat
          .filter(({ staff_id }) => staff_id === id)
          .reduce(
            (
              result,
              { id, staff_id, staff_title, agency_branch_name },
              index
            ) => {
              if (index === 0) {
                result.push({
                  id,
                  staff_id,
                  staff_title,
                  agency_branch_name_list: [agency_branch_name],
                });
              } else {
                const titleExistIndex = result.findIndex(
                  (el) => el.staff_title === staff_title
                );

                if (titleExistIndex === -1) {
                  result.push({
                    id,
                    staff_id,
                    staff_title,
                    agency_branch_name_list: [agency_branch_name],
                  });
                } else {
                  result[titleExistIndex].agency_branch_name_list.push(
                    agency_branch_name
                  );
                }
              }

              return result;
            },
            []
          ),
        isAllowViewImportNWholesalePrice,
        isAllowViewShippingPrice,
        createdAt: sourceExtension.createdAt,
        updatedAt: sourceExtension.updatedAt,
      };
    }
  }
};
const handleFormatUpdateDataByValidValue = (targetObj, defaultValue) => {
  return Object.keys(targetObj).reduce(
    (result, key) => {
      if (targetObj.hasOwnProperty(key)) {
        result = { ...result, [key]: targetObj[key] };
      }

      return result;
    },
    { ...defaultValue, updatedAt: new Date() }
  );
};
module.exports = {
  handleGetFirstNameFromFullName,
  handleFormatCustomerIncludeCheckIsDelete,
  handleFormatStaffIncludeCheckIsDelete,
  handleFormatUpdateDataByValidValue,
};
