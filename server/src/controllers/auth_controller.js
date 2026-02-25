import { generateToken } from "../lib/utils.js";
import User from "../model/auth_model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { firstName, lastName, address, email, mobile, password, role } =
    req.body;

  try {
    // Validate required fields
    if (!firstName || !lastName || !address || !email || !mobile || !password) {
      return res.status(400).json({
        message:
          "All fields are required (firstName, lastName, address, email, mobile, password)",
      });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const mobileExists = await User.findOne({ mobile });
    if (mobileExists)
      return res.status(400).json({ message: "Mobile number already exists" });

    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      address,
      email,
      mobile,
      password: hash_password,
      role: role || "Resident",
      idUpload: req.file ? req.file.filename : null,
    });

    if (newUser) {
      await newUser.save();
      generateToken(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        address: newUser.address,
        email: newUser.email,
        mobile: newUser.mobile,
        role: newUser.role,
        status: newUser.status,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log(`Error in signup controller ${error.message}`);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);

      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate field value entered",
      });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
    });
  } catch (error) {
    console.log(`Error in login controller ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("access_token", "", { maxAge: 0 });
    res.cookie("refresh_token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.messsage);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error);
    res.status(500).json({ messsage: "Internal Server Error" });
  }
};
