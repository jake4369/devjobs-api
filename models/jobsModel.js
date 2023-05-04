const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "A company must have a name"],
  },
  logo: {
    type: String,
    required: [true, "A logo must have a name"],
  },
  logoBackground: {
    type: String,
  },
  position: {
    type: String,
    required: [true, "A job must have a position"],
  },
  postedAt: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, "A job must have a postedAt time"],
    default: Date.now(),
  },
  contract: {
    type: String,
    required: [true, "A job must have a contract type"],
  },
  location: {
    type: String,
    required: [true, "A job must have a location"],
  },
  website: {
    type: String,
    required: [true, "A website must be provided"],
  },
  apply: {
    type: String,
    required: [true, "A application link must be provided"],
  },
  description: {
    type: String,
    required: [true, "A job must have a description"],
  },
  requirements: {
    content: {
      type: String,
      required: [true, "A job must have requirement content"],
    },
    items: {
      type: Array,
      required: [true, "A job must have requirement content items"],
    },
  },
  role: {
    content: {
      type: String,
      required: [true, "A job must have role content"],
    },
    items: {
      type: Array,
      required: [true, "A job must have role content items"],
    },
  },
});

const Jobs = mongoose.model("Jobs", jobsSchema);

module.exports = Jobs;
