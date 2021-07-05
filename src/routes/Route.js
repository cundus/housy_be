const { Router } = require("express");
const route = Router();

// Controller
const { users, deleteUser } = require("../controller/users");
const { register, signIn } = require("../controller/auth");
// Middleware
const { auth } = require("../../middleware/auth");
const { getProperties, addProperties, getProperty, deleteProperties, updateProperties } = require("../controller/house");
const { getTransactions, getTransaction, addTransaction, updateTransaction } = require("../controller/transaction");

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

//Transaction
route.get("/orders", getTransactions);
route.get("/order/:id", getTransaction);
route.post("/transaction", addTransaction);
route.patch("/order/:id", updateTransaction);

module.exports = route;
