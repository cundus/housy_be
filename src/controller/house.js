const { City, Property } = require("../../models");

exports.getProperties = async (req, res) => {
  try {
    let dataProperties = await Property.findAll({
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

    const propertyMap = dataProperties.map((item) => {
      return {
        id: item.id,
        name: item.name,
        address: item.address,
        price: item.price,
        typeRent: item.typeRent,
        amenities: item.amenities.split(","),
        bedroom: item.bedroom,
        bathroom: item.bathroom,
        city: {
          id: item.city.id,
          name: item.city.name,
        },
      };
    });

    res.send({
      status: "Success!",
      data: {
        propertyMap,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

exports.getProperty = async (req, res) => {
  try {
    const getPropertyById = await Property.findOne({
      where: {
        id: req.params.id,
      },
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

    if (!getPropertyById) {
      return res.send({
        status: "False",
        message: "House ID Does Not Exist",
      });
    }

    res.send({
      status: "True",
      message: "Success",
      data: { getPropertyById },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "False",
      message: "Server Error",
    });
  }
};

exports.addProperties = async (req, res) => {
  try {
    await Property.create({
      ...req.body,
    });

    const propertyDataAdded = await Property.findOne({
      where: {
        name: req.body.name,
      },
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

    res.send({
      status: "true",
      message: "Succes Added New Property!",
      data: {
        id: propertyDataAdded.id,
        name: propertyDataAdded.name,
        city: {
          id: propertyDataAdded.city.id,
          name: propertyDataAdded.city.name,
        },
        address: propertyDataAdded.address,
        price: propertyDataAdded.price,
        typeRent: propertyDataAdded.typeRent,
        ameneties: propertyDataAdded.amenities.split(","),
        bedroom: propertyDataAdded.bedroom,
        bathroom: propertyDataAdded.bathroom,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "false",
      message: "Server Error",
    });
  }
};

exports.updateProperties = async (req, res) => {
  try {
    let newPropertyData = req.body;

    newPropertyData = await Property.update(newPropertyData, {
      where: {
        id: req.params.id,
      },
    });

    if (!newPropertyData) {
      return res.send({
        status: "failed",
        message: "House Data Does not Exist",
      });
    }

    const getPropertyById = await Property.findOne({
      where: {
        id: req.params.id,
      },
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
    res.send({
      status: "true",
      message: "Success Update Property!",
      data: {
        id: getPropertyById.id,
        name: getPropertyById.name,
        city: {
          id: getPropertyById.city.id,
          name: getPropertyById.city.name,
        },
        address: getPropertyById.address,
        price: getPropertyById.price,
        typeRent: getPropertyById.typeRent,
        ameneties: getPropertyById.amenities.split(","),
        bedroom: getPropertyById.bedroom,
        bathroom: getPropertyById.bathroom,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed",
      message: "Data Not Updated",
    });
  }
};

exports.deleteProperties = async (req, res) => {
  try {
    const deleteProperty = await Property.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteProperty) {
      return res.send({
        status: "false",
        message: "House ID Does Not Exist",
      });
    }

    res.send({
      status: "true",
      message: "House Has Been Deleted!",
      data: { id: req.params.id },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed",
      Message: "Data is not Deleted",
    });
  }
};
