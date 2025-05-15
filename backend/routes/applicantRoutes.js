import express from "express";
import Applicant from "../models/Applicant.js";
import user from "../models/userModel.js"
import Job from "../models/Job.js"; // Adjust path if needed

const router = express.Router();

// Get all applicants (admin view)
router.get("/", async (req, res) => {
  try {
    const applicants = await Applicant.find()
      .populate("jobId", "title")
      .populate("applicantId", "name email")
      .populate("recruiterId", "name email");

    res.json(applicants);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// User applies for a job
router.post("/apply/:jobId", async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ error: "Job not found" });

    const { name, email, phone, resumeUrl, applicantId } = req.body;

    // Regex Validations
    const nameRegex = /^[A-Za-z\s\.\-]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const resumeUrlRegex = /^(https?:\/\/)[^\s$.?#].[^\s]*$/i;

    if (!nameRegex.test(name)) {
      return res.status(400).json({ error: "Invalid name format" });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: "Invalid phone number. Must be 10 digits." });
    }

    if (!resumeUrlRegex.test(resumeUrl)) {
      return res.status(400).json({ error: "Invalid resume URL" });
    }

    if (!applicantId) {
      return res.status(400).json({ error: "Applicant ID is required" });
    }

    const existing = await Applicant.findOne({ applicantId, jobId: job._id });
    if (existing) {
      return res.status(400).json({ error: "You already applied for this job" });
    }

    const newApplicant = new Applicant({
      name,
      email,
      phone,
      resumeUrl,
      jobId: job._id,
      jobTitle: job.title,
      applicantId,
      recruiterId: job.recruiterId,
    });

    await newApplicant.save();

    res.status(201).json({
      message: "Application submitted successfully",
      applicant: newApplicant,
    });

  } catch (error) {
    console.error("Application error:", error);
    res.status(500).json({ error: "Failed to submit application" });
  }
});


// Get applicants for a recruiter
router.get("/recruiter/:recruiterId", async (req, res) => {
  try {
    const applicants = await Applicant.find({ recruiterId: req.params.recruiterId })
      .populate("jobId", "title")
      .populate("applicantId", "name email");

    res.json(applicants);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applicants" });
  }
});

// Get applicants for a specific job
router.get("/job/:jobId", async (req, res) => {
  try {
    const applicants = await Applicant.find({ jobId: req.params.jobId })
      .populate("applicantId", "name email");

    res.json(applicants);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applicants" });
  }
});

// Update applicant status (Accepted, Rejected)
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const updatedApplicant = await Applicant.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedApplicant) {
      return res.status(404).json({ error: "Applicant not found" });
    }

    res.json(updatedApplicant);
  } catch (error) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

// Delete an applicant
router.delete("/:id", async (req, res) => {
  try {
    await Applicant.findByIdAndDelete(req.params.id);
    res.json({ message: "Applicant deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete applicant" });
  }
});

// Get applications by applicant ID (My Jobs)
router.get("/user/:applicantId", async (req, res) => {
  try {
    const applications = await Applicant.find({ applicantId: req.params.applicantId })
      .populate("jobId", "title")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});


export default router;
