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

import bcrypt from "bcryptjs";

export const createUserByAdmin = async (req, res) => {
  try {
    const { firstName, lastName, address, email, mobile, password, role, status } = req.body;

    if (!firstName || !lastName || !address || !email || !mobile || !password) {
      return res.status(400).json({
        message: "All fields are required (firstName, lastName, address, email, mobile, password)",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email address already in use" });
    }

    const existingMobile = await User.findOne({ mobile });
    if (existingMobile) {
      return res.status(400).json({ message: "Mobile number already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      address,
      email,
      mobile,
      password: hashedPassword,
      role: role || "Resident",
      status: status || "Active",
    });

    await newUser.save();

    res.status(201).json({
      message: "User account created successfully",
      user: {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        mobile: newUser.mobile,
        address: newUser.address,
        role: newUser.role,
        status: newUser.status,
      },
    });
  } catch (error) {
    console.log(`Error in createUserByAdmin: ${error.message}`);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

export const updateUserByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, address, email, mobile, role, status, password } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email && email !== user.email) {
      const emailTaken = await User.findOne({ email, _id: { $ne: id } });
      if (emailTaken) return res.status(400).json({ message: "Email is already taken" });
      user.email = email;
    }

    if (mobile && mobile !== user.mobile) {
      const mobileTaken = await User.findOne({ mobile, _id: { $ne: id } });
      if (mobileTaken) return res.status(400).json({ message: "Mobile is already taken" });
      user.mobile = mobile;
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (address) user.address = address;
    if (role) user.role = role;
    if (status) user.status = status;

    if (password && password.trim().length >= 8) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
        address: user.address,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.log(`Error in updateUserByAdmin: ${error.message}`);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

export const deleteUserByAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent admin from accidentally deleting their own active logged-in account
    if (req.user?._id?.toString() === id) {
      return res.status(400).json({ message: "You cannot delete your own active account" });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User account deleted permanently" });
  } catch (error) {
    console.log(`Error in deleteUserByAdmin: ${error.message}`);
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
