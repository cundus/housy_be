const { Router } = require("express");
const route = Router();

// Controller
const { users, deleteUser } = require("../controller/users");
const { register } = require("../controller/auth");
const { auth } = require("../../middleware/auth");
// Middleware

//USER & AUTH
route.get("/users", users);
route.delete("/users/:id", deleteUser);
route.post("/signup", register);

module.exports = route;
