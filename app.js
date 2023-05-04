const express = require("express");

const app = express();

// MIDDLEWARE
app.use(express.json());

// ROUTES
const jobsRouter = require("./routes/jobsRoutes");

app.use("/api/v1/jobs", jobsRouter);

module.exports = app;
