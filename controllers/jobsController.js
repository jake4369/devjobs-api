const Jobs = require("../models/jobsModel");

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Jobs.find();

    res.status(200).json({
      status: "success",
      results: jobs.length,
      data: {
        jobs,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
