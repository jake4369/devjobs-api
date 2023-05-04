const { default: mongoose } = require("mongoose");
const request = require("supertest");
const app = require("../app");
const data = require("../data/dev-data/data.json");

require("dotenv").config({
  path: "../config.env",
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

beforeEach(async () => {
  await mongoose.connect(DB);
});

afterEach(async () => {
  await mongoose.connection.close();
});
