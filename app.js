const express = require("express");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const jobsRouter = require("./routes/jobsRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// MIDDLEWARE
app.use(express.json());

// ROUTES
app.use("/api/v1/jobs", jobsRouter);
app.use("/api/v1/users", userRouter);

// ERROR HANDLING
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
