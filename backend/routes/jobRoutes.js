import { Router } from "express";
import Job from "../models/Job.js"; // Import the Job model


const router = Router();
//Add a new job
router.post("/add", async (req, res) => {
  try {
    const { title, company, location, salary, type, description, recruiterId } = req.body;

    // Basic presence check
    if (!title || !company || !location || !salary || !type || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Regex validations
    if (!/^[A-Za-z\s\-&,]+$/.test(title)) {
      return res.status(400).json({ message: "Invalid title format" });
    }

    if (!/^[A-Za-z\s\-&,\.]+$/.test(company)) {
      return res.status(400).json({ message: "Invalid company name format" });
    }

    if (!/^[A-Za-z\s\-]+$/.test(location)) {
      return res.status(400).json({ message: "Invalid location format" });
    }

    if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(salary)) {
      return res.status(400).json({ message: "Invalid salary format" });
    }

    if (!/^(Full[-\s]?Time|Part[-\s]?Time|Internship|Contract)$/i.test(type)) {
      return res.status(400).json({ message: "Invalid job type" });
    }

    if (!/^.{20,}$/.test(description)) {
      return res.status(400).json({ message: "Description must be at least 20 characters long" });
    }

    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ message: "Job added successfully", job });

  } catch (error) {
    console.error("Error adding job:", error);
    res.status(500).json({ message: "Error adding job", error });
  }
});


//Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }); 
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
});

router.get("/recruiterjobs", async (req, res) => {
  try {
    const recruiterId = req.headers.recruiterid; // Read recruiterId from query params
    if (!recruiterId) {
      return res.status(400).json({ message: "Recruiter ID is required" });
    }

    const jobs = await Job.find({ recruiterId });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Error fetching jobs" });
  }
});

router.get("/filteredJobs", async (req, res) => {
  try {
    const { salary, location, worktype } = req.headers; // Get filters from headers

    let query = {};

    // Add conditions only if filters exist
    if (salary) {
      query.salary = salary.split(","); // Convert comma-separated values to array
    }
    if (location) {
      query.location = { $in: location.split(",") }; // Matches any location in array
    }
    if (worktype) {
      query.type = { $in: worktype.split(",") }; // Matches any work type in array
    }

    const response = await Job.find(query); // Fetch jobs based on filters
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: "No jobs found", error: err.message });
  }
});

// Get a single job by search term
router.get("/searchTerm", async (req, res) => {
  try {
    const searchTerm = req.headers.search_term;

    const job = await Job.find({
      title: { $regex: `^${searchTerm}(\\s|$)`, $options: "i" }
    });

    if (!job || job.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "No such job is present at the moment", error });
  }
});


//Update a job
router.put("/:id", async (req, res) => {
  try {
    const { title, company, location, salary, type, description } = req.body;

    // Presence checks
    if (!title || !company || !location || !salary || !type || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Regex validations
    const titleRegex = /^[A-Za-z\s\-&,]+$/;
    const companyRegex = /^[A-Za-z\s\-&,\.]+$/;
    const locationRegex = /^[A-Za-z\s\-]+$/;
    const salaryRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
    const typeRegex = /^(Full[-\s]?Time|Part[-\s]?Time|Internship|Contract)$/i;
    const descriptionRegex = /^.{20,}$/;

    if (!titleRegex.test(title)) {
      return res.status(400).json({ message: "Invalid title format" });
    }

    if (!companyRegex.test(company)) {
      return res.status(400).json({ message: "Invalid company name format" });
    }

    if (!locationRegex.test(location)) {
      return res.status(400).json({ message: "Invalid location format" });
    }

    if (!salaryRegex.test(salary)) {
      return res.status(400).json({ message: "Invalid salary format" });
    }

    if (!typeRegex.test(type)) {
      return res.status(400).json({ message: "Invalid job type" });
    }

    if (!descriptionRegex.test(description)) {
      return res.status(400).json({ message: "Description must be at least 20 characters long" });
    }

    // Proceed with update if validations pass
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedJob) return res.status(404).json({ message: "Job not found" });

    res.status(200).json({ message: "Job updated successfully", updatedJob });

  } catch (error) {
    res.status(500).json({ message: "Error updating job", error });
  }
});


// Delete a job
router.delete("/:id", async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);

    if (!deletedJob) return res.status(404).json({ message: "Job not found" });

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error });
  }
});

export default router;
