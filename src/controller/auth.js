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
      listAsId: joi.number().min(1).required(),
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
      role_id: req.body.listAsId,
      password: hashedPassword,
    });

    console.log(dataUser);
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(
      {
        id: dataUser.id,
      },
      secretKey
    );
    console.log("INI TOKEN   ", token);
    res.send({
      status: "success",
      data: {
        user: {
          fullname: dataUser.fullname,
          email: dataUser.email,
          token,
        },
      },
    });
  } catch (error) {
    console.log("orrrrrrRAAA", error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
  } catch (error) {}
};
