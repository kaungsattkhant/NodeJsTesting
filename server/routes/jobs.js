const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");

const {
  getJobs,
  storeJob,
  getDetail,
  deleteJob,
} = require("../controllers/job.controller");
router.get("/get_all", getJobs);
router.get("/", authenticateToken, getJobs);
router.get("/:id", authenticateToken, getDetail);
router.delete("/:id", authenticateToken, deleteJob);
router.post("/", authenticateToken, storeJob);
module.exports = router;
