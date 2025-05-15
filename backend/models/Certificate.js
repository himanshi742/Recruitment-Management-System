import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true }, // Keeping as String for formatted prices
    duration: { type: String, required: true },
    instructor: { type: String, required: true },
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Associate certificate with recruiter
  },
  { timestamps: true }
);

export default mongoose.model("Certificate", certificateSchema);
