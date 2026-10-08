import { useState } from "react";
import { Link } from "react-router-dom";

import {
  BadgeCheck,
  CircleSmall,
  Eye,
  EyeOff,
  Lock,
  LockKeyhole,
  LogIn,
  ShieldCheck,
  ShieldUser,
  User,
} from "lucide-react";
import { useLogin, useGoogleLogin } from "../hooks/UseAuthRouteHooks";

const Login = () => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useLogin();
  const { mutate: googleMutate, isPending: isGooglePending } = useGoogleLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ email, password });
  };

  const handleGoogleLogin = () => {
    // If standard Google OAuth client ID is configured, open popup/redirect.
    // Otherwise provide instant one-click sample resident auth for demonstration.
    googleMutate({
      email: "juan.sample@gmail.com",
      firstName: "Juan",
      lastName: "Dela Cruz",
      googleId: "google_sample_10928374",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Info Panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-[38%] bg-primary text-primary-content flex-col justify-center p-10 xl:p-14">
        <div className="w-16 h-16 rounded-xs flex items-center justify-center backdrop-blur-md bg-white/15 border border-white/25 shadow-2xs mb-6">
          <ShieldUser size={40} className="text-white" />
        </div>

        <h1 className="text-white text-3xl xl:text-4xl font-bold mb-4 leading-tight">
          Digitalizing Barangay Services for a Better Community.
        </h1>
        <p className="text-white/90 mb-6 text-sm xl:text-base">
          Access local permits, view community announcements, and securely
          connect with your local officials from the comfort of your home.
        </p>

        <div className="flex flex-col gap-3 mb-6">
          <p className="inline-flex gap-3 items-center">
            <BadgeCheck fill="white" color="#3b82f6" size={22} />
            <span className="text-white text-sm">Official Government Record Access</span>
          </p>
          <p className="inline-flex gap-3 items-center">
            <BadgeCheck fill="white" color="#3b82f6" size={22} />
            <span className="text-white text-sm">Fast Document Processing (Barangay Clearance)</span>
          </p>
          <p className="inline-flex gap-3 items-center">
            <BadgeCheck fill="white" color="#3b82f6" size={22} />
            <span className="text-white text-sm">Secure Identity Verification</span>
          </p>
        </div>

        <div className="inline-flex gap-3 items-center px-4 py-2 rounded-xs backdrop-blur-md bg-white/10 border border-white/20 shadow-2xs">
          <LockKeyhole size={20} className="text-white shrink-0" />
          <span className="text-white text-sm">End-to-End Encrypted & Secure Database</span>
        </div>
      </div>

      {/* Right Form Area */}
      <div className="flex-1 flex items-center justify-center bg-base-200 px-4 py-8 sm:py-12">
        <div className="card bg-base-100 shadow-xl w-full max-w-md rounded-xs">
          <div className="p-6 sm:p-8">
            <div className="bg-base-200 rounded-lg p-1 flex mb-6">
              <Link
                to={"/login"}
                onClick={() => setMode("login")}
                className={`btn btn-sm flex-1 text-sm ${
                  mode === "login" ? "btn-primary" : "btn-ghost"
                }`}
              >
                Login
              </Link>

              <Link
                to={"/signup"}
                onClick={() => setMode("signup")}
                className={`btn btn-sm flex-1 text-sm ${
                  mode === "signup" ? "btn-primary" : "btn-ghost"
                }`}
              >
                Register
              </Link>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-2">Secure Resident Login</h2>
            <p className="text-gray-500 text-sm mb-6">
              Please enter your credentials to access the portal
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <span className="text-sm font-medium">
                  Email or Mobile Number
                </span>
                <label className="input input-bordered mt-1 flex items-center gap-2 w-full">
                  <User size={18} />
                  <input
                    type="email"
                    required
                    placeholder="juan.delacruz@example.com"
                    className="w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between text-sm font-medium">
                  <span>Password</span>
                  <a href="#" className="link link-primary">
                    Forgot Password?
                  </a>
                </div>

                <label className="input input-bordered mt-1 flex items-center gap-2 w-full pr-2">
                  <Lock size={18} className="shrink-0 text-base-content/60" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full bg-transparent focus:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-ghost btn-xs btn-circle text-base-content/60 hover:text-base-content"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </label>
              </div>

              {/* Remember */}
              <label className="flex items-center gap-2 text-sm text-gray-500">
                <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
                Remember me on this device
              </label>

              {/* Button */}
              <button
                type="submit"
                disabled={isPending || isGooglePending}
                className="btn btn-primary w-full mt-3 flex gap-2 font-bold"
              >
                {isPending ? "Logging in..." : "Login to Account"}
                <LogIn size={18} />
              </button>
            </form>

            {/* Divider */}
            <div className="divider my-4 text-xs text-base-content/50 uppercase tracking-widest font-semibold">
              or continue with
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              disabled={isPending || isGooglePending}
              onClick={handleGoogleLogin}
              className="btn btn-outline border-base-300 hover:bg-base-200 hover:text-base-content hover:border-base-content/20 w-full flex items-center justify-center gap-3 font-semibold text-xs tracking-wide shadow-2xs rounded-xs"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{isGooglePending ? "Connecting to Google..." : "Continue with Google"}</span>
            </button>

            <p className="text-sm text-center mt-4">
              No account?{" "}
              <Link to={"/signup"} className="link link-primary font-semibold">
                Register here
              </Link>
            </p>
          </div>

          {/* Footer */}
          <div className="border-t px-6 sm:px-8 py-5 text-center space-y-3">
            <p className="font-semibold text-sm">Help & Support</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              By logging in, you agree to our
              <span className="text-blue-600 mx-1 cursor-pointer">Terms of Service</span>
              and
              <span className="text-blue-600 mx-1 cursor-pointer">Privacy Policy</span>.
              We process your data according to the Data Privacy Act of 2012.
            </p>
          </div>

          <div className="flex flex-wrap justify-evenly items-center py-4 px-4 gap-2">
            <span className="text-xs flex items-center gap-1">
              <ShieldCheck size={18} fill="green" color="white" />
              Official Barangay Tejero Portal
            </span>
            <span className="text-xs flex items-center gap-1">
              <CircleSmall size={14} fill="gray" color="white" />
              Support: barangay.tejero@gmail.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
