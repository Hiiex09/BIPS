import User from "../model/auth_model.js";
import path from "path";
import { fileURLToPath } from "url";

const UPLOADS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "../../uploads");

// Staff-only view of a resident's uploaded ID, used to verify residency.
export const getUserIdDocument = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("idUpload");
    if (!user?.idUpload) {
      return res.status(404).json({ message: "No ID document on file for this user" });
    }

    // basename() blocks path traversal through a tampered filename
    const file = path.join(UPLOADS_DIR, path.basename(user.idUpload));
    res.set("Cache-Control", "private, no-store");
    return res.sendFile(file, (err) => {
      if (err && !res.headersSent) {
        res.status(404).json({ message: "ID document file is missing" });
      }
    });
  } catch (error) {
    console.log(`Error in getUserIdDocument ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserInfo = async (req, res) => {
  const userId = req.user._id;

  try {
    const UserInfo = await User.findById(userId).select("-password");
    if (!UserInfo) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(UserInfo);
  } catch (error) {
    console.log(`Error in get user info ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
