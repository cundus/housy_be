"use strict";
const { Model } = require("sequelize");
const properties = require("./properties");
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.Property, {
        as: "House",
        foreignKey: { name: "houseId" },
      });
    }
  }
  transaction.init(
    {
      checkin: DataTypes.DATE,
      checkout: DataTypes.DATE,
      houseId: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      status: DataTypes.STRING,
      attachment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "transaction",
      tableName: "transactions",
    }
  );
  return transaction;
};
