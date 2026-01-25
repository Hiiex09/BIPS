import mongoose, { Schema } from "mongoose";

const announcementSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["General", "Meeting", "Emergency", "Event", "Curfew"],
    },
    priority: {
      type: String,
      required: true,
      enum: ["Norman", "Important", "Urgent"],
    },
    status: { type: String, enum: ["Draft", "Published"] },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expires: { type: Date },
  },
  { timestamps: true },
);

const Announcement = mongoose.model("Announcement", announcementSchema);
export default Announcement;
