const { Router } = require("express");
const route = Router();

// Controller
const { users, deleteUser } = require("../controller/users");
const { register, signIn } = require("../controller/auth");
// Middleware
const { auth } = require("../../middleware/auth");
const { getProperties, addProperties, getProperty, deleteProperties, updateProperties } = require("../controller/house");

//USER & AUTH
route.get("/users", users);
route.delete("/users/:id", deleteUser);
route.post("/signup", register);
route.post("/signin", signIn);

//House
route.get("/houses", getProperties);
route.get("/house/:id", getProperty);
route.post("/house", auth, addProperties);
route.delete("/house/:id", auth, deleteProperties);
route.patch("/house/:id", auth, updateProperties);

module.exports = route;
