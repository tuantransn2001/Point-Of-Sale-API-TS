"use strict";
import { Model } from "sequelize";

interface TagAttributes {
  id: string;
  tag_title: string;
  tag_description: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Tag extends Model<TagAttributes> implements TagAttributes {
    id!: string;
    tag_title!: string;
    tag_description!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ CustomerTag }: any) {
      Tag.hasMany(CustomerTag, {
        foreignKey: "tag_id",
      });
    }
  }
  Tag.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      tag_title: { type: DataTypes.STRING },
      tag_description: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "Tag",
    }
  );
  return Tag;
};
