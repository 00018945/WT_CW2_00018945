const Goal = require("../../models/Goal.js");

// List all fitness goals
exports.listGoals = async (req, res) => {
    const { status } = req.query;
  
    let query = {};
    if (status && status !== "All") {
      query.status = status;
    }
  
    const goals = await Goal.find(query).sort({ targetDate: 1 });
  
    // Stats
    const all = await Goal.countDocuments();
    const completed = await Goal.countDocuments({ status: "Completed" });
    const pending = await Goal.countDocuments({ status: "Pending" });
    const inProgress = await Goal.countDocuments({ status: "In Progress" });
  
    res.render("goals/list", {
      title: "Your Fitness Goals",
      goals,
      selectedStatus: status || "All",
      stats: { all, completed, pending, inProgress },
      today: new Date().toISOString().split("T")[0]
    });
  };
  

// Show form to add a goal
exports.showAddForm = (req, res) => {
  res.render("goals/add", { title: "Add New Goal" });
};

// Create new goal
exports.createGoal = async (req, res) => {
  const { title, description, targetDate } = req.body;
  try {
    await Goal.create({ title, description, targetDate });
    res.redirect("/goals");
  } catch (err) {
    res.status(400).send("Failed to add goal. Make sure all fields are filled.");
  }
};

// Show edit form
exports.showEditForm = async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).send("Goal not found.");
    res.render("goals/edit", { goal });
  };
  
  // Handle edit form submit
  exports.updateGoal = async (req, res) => {
    const { title, description, targetDate, status } = req.body;
    try {
      await Goal.findByIdAndUpdate(req.params.id, { title, description, targetDate, status });
      res.redirect("/goals");
    } catch (err) {
      res.status(400).send("Failed to update goal.");
    }
  };
  
  // Delete goal
  exports.deleteGoal = async (req, res) => {
    try {
      await Goal.findByIdAndDelete(req.params.id);
      res.redirect("/goals");
    } catch (err) {
      res.status(400).send("Failed to delete goal.");
    }
  };
  // Mark goal as completed
exports.markAsCompleted = async (req, res) => {
    try {
      await Goal.findByIdAndUpdate(req.params.id, { status: "Completed" });
      res.redirect("/goals");
    } catch (err) {
      res.status(400).send("Failed to mark goal as completed.");
    }
  };
  