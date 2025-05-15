import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

// 1. Fetch all recruiters
router.get("/recruiters", async (req, res) => {
  try {
    const recruiters = await User.find({ role: "recruiter" });
    res.status(200).json(recruiters);
  } catch (error) {
    res.status(500).json({ error: "Error fetching recruiters" });
  }
});

// 2. Fetch all applicants
router.get("/applicants", async (req, res) => {
  try {
    const applicants = await User.find({ role: "applicant" });
    res.status(200).json(applicants);
  } catch (error) {
    res.status(500).json({ error: "Error fetching applicants" });
  }
});

// 3. Update a user (applicant or recruiter)
router.put("/users/:id", async (req, res) => {
  try {
    const { username, email, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, role }, // Allow changing role too
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
});

// 4. Delete a user
router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

export default router;
