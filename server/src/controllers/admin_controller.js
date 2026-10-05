import Announcement from "../model/announcement_model.js";
import User from "../model/auth_model.js";
import Certificate from "../model/cert_request_model.js";

export const getAllResident = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: "Resident" });

    res.status(200).json({
      count: count || 0,
    });
  } catch (error) {
    console.log(`Error in retrieving list of user ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const totalCertificateRequest = async (req, res) => {
  try {
    const totalRequest = await Certificate.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$count" }, // total of all certificates
          statusCounts: { $push: { status: "$_id", count: "$count" } },
        },
      },
    ]);

    if (!totalRequest || totalRequest.length === 0) {
      return res.status(200).json({ total: 0, statusCounts: [] });
    }

    const data = totalRequest[0];
    return res.status(200).json({
      total: data.total,
      statusCounts: data.statusCounts,
    });
  } catch (error) {
    console.log(`Error in total certificate request ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const totalAnnouncement = async (req, res) => {
  try {
    const count = await Announcement.countDocuments();
    res.status(200).json({ total: count || 0 });
  } catch (error) {
    console.log(`Error in total announcement ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
