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
      postedBy: req.user.fullname,
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

export const getAnnoucementPost = async (req, res) => {
  try {
    const allAnnouncementData = await Announcement.find()
      .populate("author", "fullname")
      .sort({
        createdAt: -1,
      });

    if (!allAnnouncementData) {
      return res.status(400).json({ message: "No announcement available" });
    }

    res.status(200).json({ allAnnouncementData });
  } catch (error) {
    console.log(`Error in getting announcement: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
