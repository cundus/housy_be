const { user } = require("../../models");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = req.body;

    const dataValidation = joi.object({
      fullname: joi.string().min(3).required(),
      username: joi.string().min(4).required(),
      email: joi.string().email().required(),
      password: joi.string().min(8).required(),
      listAsId: joi.string().min(1).required(),
      gender: joi.string().required(),
      address: joi.string().min(10).required(),
    });

    const { error } = dataValidation.validate(data);
    console.log(data);
    if (error) {
      return res.send({
        status: "failed",
        message: error.details[0].message,
      });
    }

    // CHECK EMAIL
    const checkEmail = await user.findOne({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return res.send({
        status: "failed",
        message: "Email Sudah Terregister",
      });
    }

    // HASH PASSWORD
    const hashStrength = 10;
    const hashedPassword = await bcrypt.hash(password, hashStrength);

    const dataUser = await user.create({
      ...data,
      password: hashedPassword,
    });

    res.send({
      status: "success",
      data: {
        user: {
          fullname: dataUser.fullname,
          email: dataUser.email,
        },
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
