const express = require("express");
const router = express.Router();

const { getFunctions } = require("../controllers/function.controller");

router.get("/", getFunctions);
module.exports = router;
