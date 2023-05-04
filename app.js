const express = require("express");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const jobsRouter = require("./routes/jobsRoutes");

const app = express();

// MIDDLEWARE
app.use(express.json());

// ROUTES
app.use("/api/v1/jobs", jobsRouter);

// ERROR HANDLING
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
