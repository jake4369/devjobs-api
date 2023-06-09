const express = require("express");
const jobsController = require("../controllers/jobsController");

const router = express.Router();

router.route("/").get(jobsController.getAllJobs);

module.exports = router;
