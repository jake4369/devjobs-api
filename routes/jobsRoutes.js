const express = require("express");
const jobsController = require("../controllers/jobsController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, jobsController.getAllJobs)
  .post(jobsController.createJob);

router
  .route("/:id")
  .get(jobsController.getJob)
  .delete(
    authController.protect,
    authController.restrictTo("admin", "employer"),
    jobsController.deleteJob
  );

module.exports = router;
