const handleSeedData = async (Model: any, dataSeed: any) => {
  await Model.bulkCreate(dataSeed);
};

export default handleSeedData;
