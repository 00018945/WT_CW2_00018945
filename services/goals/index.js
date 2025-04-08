const Goal = require("../../models/Goal");

// Get all goals, optionally filtered by status
exports.getAllGoals = (query = {}) => {
  return Goal.find(query).sort({ targetDate: 1 });
};

// Get stats for dashboard
exports.getStats = async () => {
  const [all, completed, pending, inProgress] = await Promise.all([
    Goal.countDocuments(),
    Goal.countDocuments({ status: "Completed" }),
    Goal.countDocuments({ status: "Pending" }),
    Goal.countDocuments({ status: "In Progress" }),
  ]);

  return { all, completed, pending, inProgress };
};

// Get goal by ID
exports.getGoalById = (id) => {
  return Goal.findById(id);
};

// Create new goal
exports.createGoal = (data) => {
  return Goal.create(data);
};

// Update goal by ID
exports.updateGoal = (id, data) => {
  return Goal.findByIdAndUpdate(id, data);
};

// Delete goal by ID
exports.deleteGoal = (id) => {
  return Goal.findByIdAndDelete(id);
};

// Mark goal as completed
exports.markAsCompleted = (id) => {
  return Goal.findByIdAndUpdate(id, { status: "Completed" });
};
