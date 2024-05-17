const express = require("express");
const route = express.Router();
const auth = require("../middleware/auth");
const listController = require("../controller/list.controller");

// GET
route.get("/:id", auth, listController.getListByAccountID);

// POST
route.post("/", auth, listController.createList);

// DELETE
route.delete("/:id", auth, listController.deleteList);

module.exports = route;