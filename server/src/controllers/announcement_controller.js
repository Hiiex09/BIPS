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

export const updateAnnouncement = async (req, res) => {
  const { id } = req.params;
  const { title, content, category, priority, status, expiresAt } = req.body;

  try {
    const announcement = await Announcement.findByIdAndUpdate(
      id,
      {
        title,
        content,
        category,
        priority,
        status,
        expiresAt,
      },
      { new: true },
    );

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json({ message: "Announcement updated successfully" });
  } catch (error) {
    console.log(`Error in updating announcement ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteAnnouncement = async (req, res) => {
  const { id } = req.params;

  try {
    const announcement = await Announcement.findById(id);

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    if (announcement.expires) {
      await announcement.updateOne({ expires: new Date() });
      return res
        .status(200)
        .json({ message: "Announcement expired successfully" });
    }

    await Announcement.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Announcement deleted successfully" });
  } catch (error) {
    console.log(`Error in deleting announcement ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
