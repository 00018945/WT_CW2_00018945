const express = require("express");
const router = express.Router();
const controller = require("../../controllers/goals");

router.get("/", controller.listGoals);
router.get("/add", controller.showAddForm);
router.post("/add", controller.createGoal);
router.get("/edit/:id", controller.showEditForm);
router.post("/edit/:id", controller.updateGoal);
router.post("/delete/:id", controller.deleteGoal);
router.post("/complete/:id", controller.markAsCompleted);

module.exports = router;
