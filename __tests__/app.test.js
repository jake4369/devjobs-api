const { default: mongoose } = require("mongoose");
const request = require("supertest");
const app = require("../app");
const data = require("../data/dev-data/data.json");

require("dotenv").config({
  path: "./config.env",
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

describe("GET /api/v1/jobs", () => {
  it("should return an array of all jobs", async () => {
    const expectedObject = {
      company: expect.any(String),
      logo: expect.any(String),
      logoBackground: expect.any(String),
      position: expect.any(String),
      postedAt: expect.any(String),
      contract: expect.any(String),
      location: expect.any(String),
      website: expect.any(String),
      apply: expect.any(String),
      description: expect.any(String),
      requirements: expect.any(Object),
      role: expect.any(Object),
    };

    const res = await request(app).get("/api/v1/jobs");
    const { jobs } = res.body.data;
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(jobs)).toBe(true);
    expect(jobs.length).toBe(15);
    jobs.forEach((job) => expect(job).toMatchObject(expectedObject));
  });
});
