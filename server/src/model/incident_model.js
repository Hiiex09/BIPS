import mongoose, { Schema } from "mongoose";

const incidentSchema = new Schema(
  {
    residentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Road / Infrastructure",
        "Waste Management",
        "Public Safety",
        "Noise Complaint",
        "Flooding",
        "Street Lighting",
        "Other",
      ],
    },
    subject: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved", "Closed"],
      default: "Open",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    resolutionNotes: { type: String, trim: true },
  },
  { timestamps: true },
);

const Incident = mongoose.model("Incident", incidentSchema);
export default Incident;
