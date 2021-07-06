const { Property, City } = require("../../models");
const { Op } = require("sequelize");

exports.filter = async (req, res) => {
  try {
    const filterValue = { ...req.query };

    let objectCondition = {};

    if (filterValue.typeRent != null) {
      objectCondition.typeRent = {
        [Op.eq]: filterValue.typeRent,
      };
    }

    if (filterValue.belowPrice != null) {
      objectCondition.price = {
        [Op.lte]: filterValue.belowPrice,
      };
    }

    console.log(objectCondition);
    let filteredData = await Property.findAll({
      where: objectCondition,
      include: {
        model: City,
        as: "city",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["cityId", "createdAt", "updatedAt"],
      },
    });

    filteredData = filteredData.map((item) => {
      item.amenities = item.amenities.split(",");
      return item;
    });
    res.send({
      status: "True",
      data: filteredData,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed",
      message: "Cannot Filter Data",
    });
  }
};
