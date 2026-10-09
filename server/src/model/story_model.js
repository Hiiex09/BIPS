import mongoose, { Schema } from "mongoose";

const storySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Story title is required"],
      trim: true,
      maxlength: [120, "Title cannot exceed 120 characters"],
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: [200, "Excerpt cannot exceed 200 characters"],
    },
    content: {
      type: String,
      required: [true, "Story content is required"],
    },
    category: {
      type: String,
      enum: ["Local Events", "Project Updates", "Highlights", "General"],
      default: "General",
    },
    image: {
      type: String,
      default: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Published", "Rejected"],
      default: "Pending",
    },
    reviewerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviewerNotes: {
      type: String,
      default: "",
    },
    publishedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Story = mongoose.model("Story", storySchema);
export default Story;

