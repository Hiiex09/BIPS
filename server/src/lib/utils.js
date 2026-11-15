import jwt from "jsonwebtoken";

const ACCESS_MAX_AGE = 15 * 60 * 1000;
const REFRESH_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

// One definition of the auth cookie flags, used everywhere a cookie is set or cleared.
export const authCookieOptions = (maxAge) => ({
  maxAge,
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV !== "development",
});

export const signAccessToken = (user_id) =>
  jwt.sign({ user_id }, process.env.ACCESS_TOKEN, { expiresIn: "15mins" });

export const setAccessCookie = (res, access_token) =>
  res.cookie("access_token", access_token, authCookieOptions(ACCESS_MAX_AGE));

export const generateToken = (user_id, res) => {
  const access_token = signAccessToken(user_id);
  const refresh_token = jwt.sign({ user_id }, process.env.REFRESH_TOKEN, {
    expiresIn: "7days",
  });

  setAccessCookie(res, access_token);
  res.cookie("refresh_token", refresh_token, authCookieOptions(REFRESH_MAX_AGE));

  return { access_token, refresh_token };
};

export const clearAuthCookies = (res) => {
  res.cookie("access_token", "", authCookieOptions(0));
  res.cookie("refresh_token", "", authCookieOptions(0));
};

// Users who are not Active must not hold a session.
export const inactiveAccountMessage = (status) =>
  status === "Suspended"
    ? "This account is suspended. Contact the barangay hall to restore access."
    : "This account is deactivated. Contact the barangay hall if you need access again.";
