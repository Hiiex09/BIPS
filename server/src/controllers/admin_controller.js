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

export const getUsersList = async (req, res) => {
  try {
    const { role, status, search } = req.query;
    const filter = {};
    if (role && role !== "all") filter.role = role;
    if (status && status !== "all") filter.status = status;
    if (search) {
      const q = new RegExp(search, "i");
      filter.$or = [
        { firstName: q },
        { lastName: q },
        { email: q },
        { mobile: q },
      ];
    }
    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({ users });
  } catch (error) {
    console.log(`Error in getUsersList: ${error.message}`);
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
