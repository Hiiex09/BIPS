import Story from "../model/story_model.js";

// ── Resident: Submit new story proposal ─────────────────────
export const createStory = async (req, res) => {
  try {
    const { title, excerpt, content, category, image } = req.body;
    const authorId = req.user._id;
    const authorName = `${req.user.firstName || ""} ${req.user.lastName || ""}`.trim() || req.user.email;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const story = new Story({
      title,
      excerpt: excerpt || content.slice(0, 150) + "...",
      content,
      category: category || "General",
      image: image || undefined,
      authorId,
      authorName,
      status: "Pending",
    });

    await story.save();
    return res.status(201).json({ message: "Story submitted for review!", story });
  } catch (error) {
    console.error("Error creating story:", error.message);
    return res.status(500).json({ message: "Failed to submit story: " + error.message });
  }
};

// ── Resident: Get own submissions ───────────────────────────
export const getMyStories = async (req, res) => {
  try {
    const authorId = req.user._id;
    const stories = await Story.find({ authorId }).sort({ createdAt: -1 });
    return res.status(200).json({ stories });
  } catch (error) {
    console.error("Error fetching resident stories:", error.message);
    return res.status(500).json({ message: "Failed to fetch stories" });
  }
};

// ── Resident: Update pending story ──────────────────────────
export const updateMyStory = async (req, res) => {
  try {
    const { id } = req.params;
    const authorId = req.user._id;
    const { title, excerpt, content, category, image } = req.body;

    const story = await Story.findOne({ _id: id, authorId });
    if (!story) {
      return res.status(404).json({ message: "Story not found or unauthorized" });
    }

    if (story.status === "Published") {
      return res.status(400).json({ message: "Published stories cannot be modified directly" });
    }

    if (title) story.title = title;
    if (excerpt) story.excerpt = excerpt;
    if (content) story.content = content;
    if (category) story.category = category;
    if (image) story.image = image;
    story.status = "Pending"; // reset to pending if edited

    await story.save();
    return res.status(200).json({ message: "Story updated successfully", story });
  } catch (error) {
    console.error("Error updating story:", error.message);
    return res.status(500).json({ message: "Failed to update story" });
  }
};

// ── Resident: Delete pending submission ─────────────────────
export const deleteMyStory = async (req, res) => {
  try {
    const { id } = req.params;
    const authorId = req.user._id;

    const story = await Story.findOneAndDelete({ _id: id, authorId, status: { $ne: "Published" } });
    if (!story) {
      return res.status(404).json({ message: "Story not found or cannot delete published story" });
    }

    return res.status(200).json({ message: "Story proposal removed" });
  } catch (error) {
    console.error("Error deleting story:", error.message);
    return res.status(500).json({ message: "Failed to delete story" });
  }
};

// ── Public / Resident Feed: Fetch published stories ─────────
export const getPublishedStories = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const query = { status: "Published" };
    if (category && category !== "All News") {
      query.category = category;
    }

    const total = await Story.countDocuments(query);
    const stories = await Story.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.status(200).json({ stories, total, page: Number(page), totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Error fetching published stories:", error.message);
    return res.status(500).json({ message: "Failed to load community news" });
  }
};

// ── Admin / Staff: Get all stories (moderation queue) ───────
export const getAllStoriesAdmin = async (req, res) => {
  try {
    const { status, category } = req.query;
    const query = {};
    if (status && status !== "All") query.status = status;
    if (category && category !== "All") query.category = category;

    const stories = await Story.find(query).sort({ createdAt: -1 });
    return res.status(200).json({ stories, total: stories.length });
  } catch (error) {
    console.error("Error fetching moderation queue:", error.message);
    return res.status(500).json({ message: "Failed to load stories" });
  }
};

// ── Admin / Staff: Moderate story status ────────────────────
export const updateStoryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reviewerNotes } = req.body;

    if (!["Pending", "Approved", "Published", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    story.status = status;
    story.reviewerId = req.user._id;
    if (reviewerNotes !== undefined) story.reviewerNotes = reviewerNotes;
    if (status === "Published" && !story.publishedAt) {
      story.publishedAt = new Date();
    }

    await story.save();
    return res.status(200).json({ message: `Story marked as ${status}`, story });
  } catch (error) {
    console.error("Error updating story status:", error.message);
    return res.status(500).json({ message: "Failed to update status" });
  }
};

// ── Admin / Staff: Delete story permanently ─────────────────
export const deleteStoryAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findByIdAndDelete(id);
    if (!story) return res.status(404).json({ message: "Story not found" });

    return res.status(200).json({ message: "Story permanently deleted" });
  } catch (error) {
    console.error("Error deleting story:", error.message);
    return res.status(500).json({ message: "Failed to delete story" });
  }
};

