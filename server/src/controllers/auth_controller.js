import { OAuth2Client } from "google-auth-library";
import {
  clearAuthCookies,
  generateToken,
  inactiveAccountMessage,
} from "../lib/utils.js";
import User from "../model/auth_model.js";
import bcrypt from "bcryptjs";

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_MINUTES = 15;

const publicUser = (user) => ({
  _id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  address: user.address,
  email: user.email,
  mobile: user.mobile,
  role: user.role,
  avatar: user.avatar,
});

export const signup = async (req, res) => {
  const { firstName, lastName, address, email, mobile, password } = req.body;

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
      role: "Resident",
      idUpload: req.file ? req.file.filename : null,
    });

    await newUser.save();
    generateToken(newUser._id, res);

    res.status(201).json({ ...publicUser(newUser), status: newUser.status });
  } catch (error) {
    console.log(`Error in signup controller ${error.message}`);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validation failed", errors });
    }

    if (error.code === 11000) {
      return res.status(400).json({ message: "Duplicate field value entered" });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ email: email?.trim().toLowerCase() }, { mobile: email?.trim() }],
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Locked after too many wrong passwords
    if (user.lockUntil && user.lockUntil > new Date()) {
      const minutes = Math.ceil((user.lockUntil - Date.now()) / 60000);
      return res.status(423).json({
        message: `Too many failed attempts. Try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`,
      });
    }

    // Google-only accounts have no password
    const isMatch = user.password
      ? await bcrypt.compare(password, user.password)
      : false;

    if (!isMatch) {
      user.failedAttempts = (user.failedAttempts || 0) + 1;
      if (user.failedAttempts >= MAX_FAILED_ATTEMPTS) {
        user.failedAttempts = 0;
        user.isLocked = true;
        user.lockUntil = new Date(Date.now() + LOCK_MINUTES * 60 * 1000);
      }
      await user.save();
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Checked only after the password matches, so status isn't revealed to guessers
    if (user.status !== "Active") {
      return res.status(403).json({ message: inactiveAccountMessage(user.status) });
    }

    user.failedAttempts = 0;
    user.isLocked = false;
    user.lockUntil = null;
    user.lastLogin = new Date();
    await user.save();

    generateToken(user._id, res);
    res.status(200).json(publicUser(user));
  } catch (error) {
    console.log(`Error in login controller ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    clearAuthCookies(res);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const googleClient = new OAuth2Client();

/**
 * Sign in with a Google ID token (the `credential` from Google Identity Services).
 * The token is verified with Google; nothing the browser claims about the user is trusted.
 */
export const googleLogin = async (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return res.status(503).json({ message: "Google sign-in is not set up on this server." });
  }

  const { credential } = req.body;
  if (!credential || typeof credential !== "string") {
    return res.status(400).json({ message: "Google credential is required" });
  }

  let payload;
  try {
    const ticket = await googleClient.verifyIdToken({ idToken: credential, audience: clientId });
    payload = ticket.getPayload();
  } catch (error) {
    console.error(`Google token verification failed: ${error.message}`);
    return res.status(401).json({ message: "Google sign-in failed. Please try again." });
  }

  if (!payload?.email || !payload.email_verified) {
    return res.status(401).json({ message: "Your Google account email is not verified." });
  }

  try {
    const email = payload.email.toLowerCase();
    let user = await User.findOne({ googleId: payload.sub });
    if (!user) user = await User.findOne({ email });

    if (user) {
      if (user.status !== "Active") {
        return res.status(403).json({ message: inactiveAccountMessage(user.status) });
      }
      if (!user.googleId) user.googleId = payload.sub;
      if (!user.avatar && payload.picture) user.avatar = payload.picture;
    } else {
      user = new User({
        firstName: payload.given_name || "Resident",
        lastName: payload.family_name || "-",
        email,
        address: "Barangay Tejero, Cebu City",
        googleId: payload.sub,
        avatar: payload.picture || "",
        role: "Resident",
        status: "Active",
      });
    }

    user.lastLogin = new Date();
    await user.save();

    generateToken(user._id, res);
    return res.status(200).json(publicUser(user));
  } catch (error) {
    console.error(`Error in googleLogin controller: ${error.message}`);
    return res.status(500).json({ message: "Google sign-in failed. Please try again." });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
