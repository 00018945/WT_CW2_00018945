const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Fitness goal tracker",
    message: "Welcome to your personal fitness dashboard!"
  });
});

module.exports = router;
