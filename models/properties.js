"use strict";
const { Model } = require("sequelize");
const city = require("./city");
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Property.belongsTo(models.City, {
        as: "city",
        foreignKey: {
          name: "cityId",
        },
      });
      Property.hasOne(models.transaction, {
        as: "House",
        foreignKey: { name: "houseId" },
      });
    }
  }
  Property.init(
    {
      name: DataTypes.STRING,
      cityId: DataTypes.INTEGER,
      address: DataTypes.STRING,
      price: DataTypes.INTEGER,
      typeRent: DataTypes.STRING,
      amenities: DataTypes.STRING,
      bedroom: DataTypes.INTEGER,
      bathroom: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Property",
      tableName: "properties",
    }
  );
  return Property;
};
