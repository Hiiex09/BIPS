import Announcement from "../model/announcement_model.js";

export const PostAnnouncement = async (req, res) => {
  const { title, content, category, priority, status, expiresAt } = req.body;
  try {
    const announcement = await Announcement.create({
      title,
      content,
      category,
      priority,
      status,
      expiresAt,
      author: req.user._id, // injected from auth middleware
    });

    res.status(201).json({
      message: "Announcement created successfully",
      announcement,
    });
  } catch (error) {
    console.log(`Error in creating announcement ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
