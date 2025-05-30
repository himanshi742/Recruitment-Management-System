import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Associate job with recruiter
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
