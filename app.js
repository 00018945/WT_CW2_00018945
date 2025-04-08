require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const indexRoutes = require("./routes/index");
const goalRoutes = require("./routes/goals");

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(" MongoDB connected"))
  .catch(err => console.error(" MongoDB error:", err));

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static assets
app.use("/css", express.static(path.join(__dirname, "public/styles")));
app.use("/js", express.static(path.join(__dirname, "public/javascripts")));
app.use("/images", express.static(path.join(__dirname, "public/images")));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", indexRoutes);       // Homepage
app.use("/goals", goalRoutes);   // Fitness goal routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Server running at http://localhost:${PORT}`));
