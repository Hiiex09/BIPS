import jwt from "jsonwebtoken";
import User from "../model/auth_model.js";
import {
  clearAuthCookies,
  inactiveAccountMessage,
  setAccessCookie,
  signAccessToken,
} from "../lib/utils.js";

const loadUser = (user_id) => User.findById(user_id).select("-password");

// Rejects sessions for missing or non-Active accounts, so suspending a user takes effect immediately.
const rejectInactive = (user, res) => {
  if (!user) {
    clearAuthCookies(res);
    res.status(401).json({ message: "User not found" });
    return true;
  }
  if (user.status !== "Active") {
    clearAuthCookies(res);
    res.status(403).json({ message: inactiveAccountMessage(user.status) });
    return true;
  }
  return false;
};

export const protectRoute = async (req, res, next) => {
  try {
    const access_token = req.cookies.access_token;
    const refresh_token = req.cookies.refresh_token;

    if (!access_token && !refresh_token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    try {
      const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN);
      const user = await loadUser(decoded.user_id);
      if (rejectInactive(user, res)) return;

      req.user = user;
      return next();
    } catch (error) {
      // Access token missing or expired: fall back to the refresh token.
      const canRefresh =
        refresh_token && (!access_token || error.name === "TokenExpiredError");
      if (!canRefresh) {
        return res.status(401).json({ message: "Invalid access token" });
      }

      try {
        const decodedRefresh = jwt.verify(refresh_token, process.env.REFRESH_TOKEN);
        const user = await loadUser(decodedRefresh.user_id);
        if (rejectInactive(user, res)) return;

        setAccessCookie(res, signAccessToken(user._id));
        req.user = user;
        return next();
      } catch {
        return res.status(401).json({ message: "Invalid refresh token" });
      }
    }
  } catch (error) {
    console.log("Error in protectRoute middleware", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
