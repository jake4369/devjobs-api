const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const jobsRouter = require("./routes/jobsRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// GLOBAL
// Set security HTTP header
app.use(helmet());

// Limit requests from the same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in 1 hour!",
});

app.use("/api", limiter);

// MIDDLEWARE
// Body parser, reading data from body into req.body
app.use(
  express.json({
    limit: "10kb",
  })
);

// ROUTES
app.use("/api/v1/jobs", jobsRouter);
app.use("/api/v1/users", userRouter);

// ERROR HANDLING
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
