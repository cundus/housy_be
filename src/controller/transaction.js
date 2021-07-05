const { transaction, City, Property } = require("../../models");

exports.getTransactions = async (req, res) => {
  try {
    const dataTransactions = await transaction.findAll({
      include: {
        model: Property,
        as: "House",
        include: {
          model: City,
          as: "city",
          attributes: {
            exclude: ["updatedAt", "createdAt"],
          },
        },
        attributes: {
          exclude: ["cityId", "updatedAt", "createdAt"],
        },
      },
      attributes: {
        exclude: ["houseId", "createdAt", "updatedAt"],
      },
    });

    const transactionMap = dataTransactions.map((item) => {
      return {
        id: item.id,
        checkin: item.checkin,
        checkout: item.checkout,
        house: {
          id: item.House.id,
          name: item.House.name,
          city: {
            id: item.House.city.id,
            name: item.House.city.name,
          },
          address: item.House.address,
          price: item.House.price,
          typeRent: item.House.typeRent,
          amenities: item.House.amenities.split(","),
          bedroom: item.House.bedroom,
          bathroom: item.House.bathroom,
        },
        total: item.total,
        status: item.status,
        attachment: item.attachment,
      };
    });
    res.status(200).send({
      status: "Success",
      data: {
        transactionMap,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Cannot Get Data",
    });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const getTransactionById = await transaction.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Property,
        as: "House",
        include: {
          model: City,
          as: "city",
          attributes: {
            exclude: ["updatedAt", "createdAt"],
          },
        },
        attributes: {
          exclude: ["cityId", "updatedAt", "createdAt"],
        },
      },
      attributes: {
        exclude: ["houseId", "createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      status: "Success",
      data: {
        id: getTransactionById.id,
        checkin: getTransactionById.checkin,
        checkout: getTransactionById.checkout,
        house: {
          id: getTransactionById.House.id,
          name: getTransactionById.House.name,
          city: {
            id: getTransactionById.House.city.id,
            name: getTransactionById.House.city.name,
          },
          address: getTransactionById.House.address,
          price: getTransactionById.House.price,
          typeRent: getTransactionById.House.typeRent,
          amenities: getTransactionById.House.amenities.split(","),
          bedroom: getTransactionById.House.bedroom,
          bathroom: getTransactionById.House.bathroom,
        },
        total: getTransactionById.total,
        status: getTransactionById.status,
        attachment: getTransactionById.attachment,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Cannot Get Data",
    });
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const newData = await transaction.create({
      ...req.body,
    });

    const getTransactionById = await transaction.findOne({
      where: {
        id: newData.id,
      },
      include: {
        model: Property,
        as: "House",
        include: {
          model: City,
          as: "city",
          attributes: {
            exclude: ["updatedAt", "createdAt"],
          },
        },
        attributes: {
          exclude: ["cityId", "updatedAt", "createdAt"],
        },
      },
      attributes: {
        exclude: ["houseId", "createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      status: "True",
      message: "Success Added New Transaction",
      data: {
        id: getTransactionById.id,
        checkin: getTransactionById.checkin,
        checkout: getTransactionById.checkout,
        house: {
          id: getTransactionById.House.id,
          name: getTransactionById.House.name,
          city: {
            id: getTransactionById.House.city.id,
            name: getTransactionById.House.city.name,
          },
          address: getTransactionById.House.address,
          price: getTransactionById.House.price,
          typeRent: getTransactionById.House.typeRent,
          amenities: getTransactionById.House.amenities.split(","),
          bedroom: getTransactionById.House.bedroom,
          bathroom: getTransactionById.House.bathroom,
        },
        total: getTransactionById.total,
        status: getTransactionById.status,
        attachment: getTransactionById.attachment,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed",
      message: "Cannot Add Transaction Data",
    });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    let newTransactionData = req.body;

    newTransactionData = await transaction.update(newTransactionData, {
      where: {
        id: req.params.id,
      },
    });

    const getTransactionById = await transaction.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Property,
        as: "House",
        include: {
          model: City,
          as: "city",
          attributes: {
            exclude: ["updatedAt", "createdAt"],
          },
        },
        attributes: {
          exclude: ["cityId", "updatedAt", "createdAt"],
        },
      },
      attributes: {
        exclude: ["houseId", "createdAt", "updatedAt"],
      },
    });
    res.status(200).send({
      status: "Success",
      message: "Data has Been Updated!",
      data: {
        id: getTransactionById.id,
        checkin: getTransactionById.checkin,
        checkout: getTransactionById.checkout,
        house: {
          id: getTransactionById.House.id,
          name: getTransactionById.House.name,
          city: {
            id: getTransactionById.House.city.id,
            name: getTransactionById.House.city.name,
          },
          address: getTransactionById.House.address,
          price: getTransactionById.House.price,
          typeRent: getTransactionById.House.typeRent,
          amenities: getTransactionById.House.amenities.split(","),
          bedroom: getTransactionById.House.bedroom,
          bathroom: getTransactionById.House.bathroom,
        },
        total: getTransactionById.total,
        status: getTransactionById.status,
        attachment: getTransactionById.attachment,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed",
      message: "Cannot Update Transaction Data",
    });
  }
};
