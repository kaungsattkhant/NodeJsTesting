const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");

const {
  getJobs,
  storeJob,
  getDetail,
  deleteJob,
  applyJob,
  cancelJob,
} = require("../controllers/job.controller");
router.get("/get_all", getJobs);
router.post("/apply", applyJob);
router.get("/", authenticateToken, getJobs);
router.get("/:id", authenticateToken, getDetail);
router.get("/detail/:id", getDetail);
router.delete("/:id", authenticateToken, deleteJob);
router.delete("/:jobId/customer/:customerId", cancelJob);
router.post("/", authenticateToken, storeJob);
module.exports = router;
