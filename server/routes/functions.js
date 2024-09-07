const express = require("express");
const router = express.Router();
const authenticateToken = require('../middleware/auth');

const { getFunctions } = require("../controllers/function.controller");
router.get("/",authenticateToken, getFunctions);
router.get("/get_all", getFunctions);
module.exports = router;
