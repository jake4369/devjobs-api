const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Jobs = require("../models/jobsModel");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllJobs = catchAsync(async (req, res, next) => {
  // 1) Keyword search
  const searchTerm = req.query.search;
  if (searchTerm) {
    req.query.position = { $regex: searchTerm, $options: "i" };
  }

  const features = new APIFeatures(Jobs.find(), req.query).filter().paginate();

  const jobs = await features.query;

  res.status(200).json({
    status: "success",
    results: jobs.length,
    data: {
      jobs,
    },
  });
});
