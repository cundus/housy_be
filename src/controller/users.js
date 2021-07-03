const { user, role } = require("../../models");

exports.users = async (req, res) => {
  try {
    // const path = process.env.PATH_FILE;

    let users = await user.findAll({
      include: {
        model: role,
        as: "listAs",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["role_id", "password", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleteUser = await user.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteUser) {
      return res.send({
        status: "false",
        message: "User ID Does Not Exist",
      });
    }

    res.send({
      status: "true",
      message: "User Has Been Deleted!",
      data: { id: req.params.id },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "false",
      message: "internal server error",
    });
  }
};
