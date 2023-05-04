const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Jobs = require("../models/jobsModel");

exports.getAllJobs = catchAsync(async (req, res, next) => {
  const jobs = await Jobs.find();

  res.status(200).json({
    status: "success",
    results: jobs.length,
    data: {
      jobs,
    },
  });
});
