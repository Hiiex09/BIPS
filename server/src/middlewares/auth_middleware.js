import jwt from "jsonwebtoken";
import User from "../model/auth_model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const access_token = req.cookies.access_token;
    const refresh_token = req.cookies.refresh_token;

    if (!access_token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    try {
      const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN);
      const user = await User.findById(decoded.user_id).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = user;
      return next();
    } catch (error) {
      if (error.name === "TokenExpiredError" && refresh_token) {
        try {
          const decodedRefresh = jwt.verify(
            refresh_token,
            process.env.REFRESH_TOKEN,
          );

          const user = await User.findById(decodedRefresh.user_id).select(
            "-password",
          );

          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }

          const newAccessToken = jwt.sign({ id: user_id }, access_token, {
            expiresIn: "15mins",
          });

          res.cookie("access_token", newAccessToken, {
            maxAge: 15 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
          });

          req.user = user;
          return next();
        } catch (error) {
          return res.status(401).json({ message: "Invalid refresh token" });
        }
      }
      return res
        .status(401)
        .json({ message: "Invalid or expired access token" });
    }
  } catch (error) {
    console.log(`Protect Route Error ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
