const express = require("express");
const route = express.Router();
const auth = require("../middleware/auth");
const listController = require("../controller/list.controller");

// GET
route.get("/:accountId", auth, listController.getListByAccountID);

// POST

route.post("/", auth, listController.createList);

// DELETE
route.delete("/:accountId/:slug", auth, listController.deleteList);

module.exports = route;
