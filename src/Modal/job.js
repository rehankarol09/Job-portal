const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  salary: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Internship"],
    required: true,
  },
  requirements: {
    type: [String],
  },
  responsibilities: {
    type: [String],
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
});

// Create the Job model
const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
