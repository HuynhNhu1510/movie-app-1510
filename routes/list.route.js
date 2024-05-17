const express = require("express");
const route = express.Router();
const auth = require("../middleware/auth");

// GET
route.get("/:id", auth, );

// POST
route.post("/list", auth);

// DELETE\
route.delete("/:id")