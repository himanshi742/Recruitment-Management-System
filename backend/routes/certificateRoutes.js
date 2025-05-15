import { Router } from "express";
const router = Router();
import Certificate from "../models/Certificate.js";

// ✅ Get all Certificates
router.get("/", async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ error: "Error fetching certificates" });
  }
});

router.get("/recruitercertificate", async (req, res) => {
  try {
    const recruiterId = req.headers.recruiterid; // Read recruiterId from query params
    if (!recruiterId) {
      return res.status(400).json({ message: "Recruiter ID is required" });
    }

    const certificate = await Certificate.find({ recruiterId });
    res.status(200).json(certificate);
  } catch (error) {
    console.error("Error fetching certificate:", error);
    res.status(500).json({ message: "Error fetching certificate" });
  }
});




// Add a new Certificate
router.post("/add", async (req, res) => {
  try {
    const { title, description, price, duration, instructor, recruiterId } = req.body;

    // Regex definitions
    const titleRegex = /^[A-Za-z0-9\s\-&,]+$/;
    const descriptionRegex = /^.{20,}$/;
    const priceRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
    const durationRegex = /^[0-9]+\s?(weeks|days|months)$/i;
    const instructorRegex = /^[A-Za-z\s\.\-]+$/;

    // Field validations
    if (!title || !description || !price || !duration || !instructor) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!titleRegex.test(title)) {
      return res.status(400).json({ error: "Invalid title format" });
    }

    if (!descriptionRegex.test(description)) {
      return res.status(400).json({ error: "Description must be at least 20 characters long" });
    }

    if (!priceRegex.test(price)) {
      return res.status(400).json({ error: "Invalid price format" });
    }

    if (!durationRegex.test(duration)) {
      return res.status(400).json({ error: "Invalid duration format (e.g., '3 weeks', '10 days')" });
    }

    if (!instructorRegex.test(instructor)) {
      return res.status(400).json({ error: "Invalid instructor name format" });
    }

    const newCertificate = new Certificate({ title, description, price, duration, instructor, recruiterId });
    await newCertificate.save();
    res.status(201).json(newCertificate);
  } catch (err) {
    res.status(500).json({ error: "Error adding new certificate" });
  }
});


// Update a Certificate
router.put("/:id", async (req, res) => {
  try {
    const { title, description, price, duration, instructor } = req.body;

    const titleRegex = /^[A-Za-z0-9\s\-&,]+$/;
    const descriptionRegex = /^.{20,}$/;
    const priceRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
    const durationRegex = /^[0-9]+\s?(weeks|days|months)$/i;
    const instructorRegex = /^[A-Za-z\s\.\-]+$/;

    if (!title || !description || !price || !duration || !instructor) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!titleRegex.test(title)) {
      return res.status(400).json({ error: "Invalid title format" });
    }

    if (!descriptionRegex.test(description)) {
      return res.status(400).json({ error: "Description must be at least 20 characters long" });
    }

    if (!priceRegex.test(price)) {
      return res.status(400).json({ error: "Invalid price format" });
    }

    if (!durationRegex.test(duration)) {
      return res.status(400).json({ error: "Invalid duration format" });
    }

    if (!instructorRegex.test(instructor)) {
      return res.status(400).json({ error: "Invalid instructor name format" });
    }

    const updatedCertificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedCertificate) return res.status(404).json({ error: "Certificate not found" });

    res.json(updatedCertificate);
  } catch (err) {
    res.status(500).json({ error: "Error updating certificate" });
  }
});


// Delete a Certificate
router.delete("/:id", async (req, res) => {
  try {
    const deletedCertificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!deletedCertificate) return res.status(404).json({ error: "Certificate not found" });
    res.json({ message: "Certificate deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting certificate" });
  }
});

export default router;
