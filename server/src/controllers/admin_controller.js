import Announcement from "../model/announcement_model.js";
import User from "../model/auth_model.js";
import Certificate from "../model/cert_request_model.js";

export const getAllResident = async (req, res) => {
  try {
    const allResidentUser = await User.countDocuments({ role: "Resident" });

    if (!allResidentUser) {
      return res.status(400).json({ message: "No resident available" });
    }

    res.status(200).json({
      message: `Total Registered Resident: ${allResidentUser}`,
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

    const data = totalRequest[0];

    let responseText = `Total Certificates: ${data.total}\n`;
    data.statusCounts.forEach((item) => {
      responseText += `${item.status}: ${item.count}\n`;
    });

    res.send(responseText);
  } catch (error) {
    console.log(`Error in total certificate request ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const totalAnnouncement = async (req, res) => {
  try {
    const getAllAnnouncement = await Announcement.aggregate([
      { $count: "total" },
    ]);
    res.status(200).json({ getAllAnnouncement });
  } catch (error) {}
};
