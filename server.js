const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Define Job Schema
const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  description: String,
  salary: String,
  applyLink: String,
});

const Job = mongoose.model("Job", jobSchema);

// Admin Credentials (Hardcoded for simplicity)
const ADMIN_CREDENTIALS = { username: "admin", password: "admin" };

// Admin Login Route
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    res.json({ message: "✅ Admin logged in", isAdmin: true });
  } else {
    res.status(401).json({ error: "❌ Invalid admin credentials" });
  }
});

// Add Job Route (Admin Only)
app.post("/api/admin/add-job", async (req, res) => {
  const { title, company, location, description, salary, applyLink } = req.body;
  try {
    const newJob = new Job({ title, company, location, description, salary, applyLink });
    await newJob.save();
    res.json({ message: "✅ Job added successfully", job: newJob });
  } catch (err) {
    res.status(500).json({ error: "❌ Error adding job" });
  }
});

// Get All Jobs Route
app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "❌ Error retrieving jobs" });
  }
});

// Update Job Route (Admin Only)
app.put("/api/admin/update-job/:id", async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "✅ Job updated successfully", updatedJob });
  } catch (err) {
    res.status(500).json({ error: "❌ Error updating job" });
  }
});

// Delete Job Route (Admin Only)
app.delete("/api/admin/delete-job/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "❌ Error deleting job" });
  }
});

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
