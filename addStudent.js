const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Only needed if passwords are hashed
require("dotenv").config(); // Load .env file

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Define Student Schema (if not already defined)
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // Make sure this matches how passwords are stored
});

const Student = mongoose.model("Student", studentSchema);

// Function to add a student
async function addStudent() {
  const hashedPassword = await bcrypt.hash("student123", 10); // Hash password if using bcrypt

  const newStudent = new Student({
    name: "John Doe",
    email: "student@example.com",
    password: hashedPassword, // Use plain "student123" if passwords are NOT hashed
  });

  await newStudent.save();
  console.log("🎉 Student added successfully!");
  mongoose.connection.close(); // Close connection after adding
}

addStudent();