import mongoose, { Schema } from "mongoose";

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

export const userSchema = new Schema(
  {
    fullname: { type: String, required: [true, "User fullname is required"] },
    email: {
      type: String,
      required: [true, "User email is required"],
      unique: true,
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    mobile: {
      type: String,
      required: [true, "Mobile phone is required"],
      unique: true,
      minlength: [11, "Mobile number must be 11 digits"],
      maxlength: [11, "Mobile number must be 11 digits"],
    },
    password: {
      type: String,
      required: [true, "Password must be at least 8 character"],
      minlength: 8,
    },
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
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
