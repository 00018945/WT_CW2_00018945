const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Goal title is required"]
  },
  description: {
    type: String,
    required: [true, "Description is required"]
  },
  targetDate: {
    type: Date,
    required: [true, "Target date is required"]
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Goal", goalSchema);
