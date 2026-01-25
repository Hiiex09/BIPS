import mongoose, { Schema } from "mongoose";

const certRequestSchema = new Schema({
  residentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  certificate_type: {
    type: String,
    enum: ["Barangay Clearance", "Barangay Indigency", "Barangay Residency"],
    required: true,
  },
  purpose: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Ready for Pickup"],
    required: true,
  },
  dateRequested: { type: Date },
  dateApproved: { type: Date },
  processedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  remarks: { type: String },
  contactNumber: { type: String },
});

const Certificate = mongoose.model("Certificate", certRequestSchema);
export default Certificate;
