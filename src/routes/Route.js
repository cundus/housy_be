const { Router } = require("express");
const { users, deleteUser } = require("../controller/users");
const { register } = require("../controller/auth");
const route = Router();

//USER & AUTH
route.get("/users", users);
route.delete("/users/:id", deleteUser);
route.post("/signup", register);

module.exports = route;
