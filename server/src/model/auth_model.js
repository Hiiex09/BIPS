import mongoose, { Schema } from "mongoose";

export const userSchema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: Number, required: true, unique: true, maxlenth: 11 },
    password: { type: String, required: true, minlength: 8 },
    role: {
      type: String,
      enum: ["Admin", "Staff", "Resident"],
      default: "Resident",
    },
    status: {
      type: String,
      enum: ["Active", "Suspended", "Deactivated"],
      default: "Active",
    },
    // For Security Details
    lastLogin: { type: Date },
    failedAttempts: { type: Number, default: 0 },
    isLocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
