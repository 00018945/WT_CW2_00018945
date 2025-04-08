const goalService = require("../../services/goals");

// List all fitness goals
exports.listGoals = async (req, res) => {
  try {
    const { status } = req.query;

    let query = {};
    if (status && status !== "All") {
      query.status = status;
    }

    const goals = await goalService.getAllGoals(query);
    const stats = await goalService.getStats();

    res.render("goals/list", {
      title: "Your Fitness Goals",
      goals,
      selectedStatus: status || "All",
      stats,
      today: new Date().toISOString().split("T")[0]
    });
  } catch (err) {
    console.error("💥 Error in listGoals:", err);  // Add this
    res.status(500).send("Failed to load goals.");
  }
};


// Show form to add a goal
exports.showAddForm = (req, res) => {
  res.render("goals/add", { title: "Add New Goal" });
};

// Create new goal
exports.createGoal = async (req, res) => {
  const { title, description, targetDate } = req.body;
  if (!title || !description || !targetDate) {
    return res.status(400).send("All fields are required.");
  }

  try {
    await goalService.createGoal({ title, description, targetDate });
    res.redirect("/goals");
  } catch (err) {
    res.status(400).send("Failed to add goal.");
  }
};

// Show edit form
exports.showEditForm = async (req, res) => {
  try {
    const goal = await goalService.getGoalById(req.params.id);
    if (!goal) return res.status(404).send("Goal not found.");
    res.render("goals/edit", { goal });
  } catch (err) {
    res.status(500).send("Error loading goal.");
  }
};

// Update goal
exports.updateGoal = async (req, res) => {
  const { title, description, targetDate, status } = req.body;
  if (!title || !description || !targetDate || !status) {
    return res.status(400).send("All fields are required.");
  }

  try {
    await goalService.updateGoal(req.params.id, {
      title,
      description,
      targetDate,
      status,
    });
    res.redirect("/goals");
  } catch (err) {
    res.status(400).send("Failed to update goal.");
  }
};

// Delete goal
exports.deleteGoal = async (req, res) => {
  try {
    await goalService.deleteGoal(req.params.id);
    res.redirect("/goals");
  } catch (err) {
    res.status(400).send("Failed to delete goal.");
  }
};

// Mark goal as completed
exports.markAsCompleted = async (req, res) => {
  try {
    await goalService.markAsCompleted(req.params.id);
    res.redirect("/goals");
  } catch (err) {
    res.status(400).send("Failed to mark goal as completed.");
  }
};
