import User from "../model/auth_model.js";

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
