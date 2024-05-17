const express = require("express");
const authController = require("../controller/auth.controller");
const auth = require("../middleware/auth");
const route = express.Router();


// POST - register
route.post("/registered", authController.registered);

// POST - login
route.post("/login", authController.login);

// POST - refresh 
route.post("/refresh", authController.requestRefreshToken);

// GET - user
route.get("/:id", auth, authController.getAccount);

module.exports = route;
