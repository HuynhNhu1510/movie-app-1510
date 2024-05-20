const express = require("express");
const route = express.Router();
const auth = require("../middleware/auth");
const listController = require("../controller/list.controller");

// GET
route.get("/:account_id", auth, listController.getListByAccountID);

// POST
route.post("/", auth, listController.createList);

// DELETE
route.delete("/:account_id/:slug", auth, listController.deleteList);

module.exports = route;
