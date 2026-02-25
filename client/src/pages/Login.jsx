import { useState } from "react";
import { Link } from "react-router-dom";

import {
  BadgeCheck,
  CircleSmall,
  Lock,
  LockKeyhole,
  LogIn,
  ShieldCheck,
  ShieldUser,
  User,
} from "lucide-react";
import { loginAuthUsers } from "../hooks/UseAuthRouteHooks";
import { useQueryClient } from "@tanstack/react-query";

const Login = () => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();

  const { mutate } = loginAuthUsers();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ email, password });
    queryClient.invalidateQueries(["users"]);
    navigate("/welcome");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Info Panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-[38%] bg-blue-500 flex-col justify-center p-10 xl:p-14">
        <div className="w-16 h-16 rounded-xl flex items-center justify-center backdrop-blur-md bg-white/15 border border-white/25 shadow-lg mb-6">
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

        <div className="inline-flex gap-3 items-center px-4 py-2 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
          <LockKeyhole size={20} className="text-white shrink-0" />
          <span className="text-white text-sm">End-to-End Encrypted & Secure Database</span>
        </div>
      </div>

      {/* Right Form Area */}
      <div className="flex-1 flex items-center justify-center bg-base-200 px-4 py-8 sm:py-12">
        <div className="card bg-base-100 shadow-xl w-full max-w-md rounded-xl">
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
                  <a href="#" className="text-blue-600 hover:underline">
                    Forgot Password?
                  </a>
                </div>

                <label className="input input-bordered mt-1 flex items-center gap-2 w-full">
                  <Lock size={18} />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>

              {/* Remember */}
              <label className="flex items-center gap-2 text-sm text-gray-500">
                <input type="checkbox" className="checkbox checkbox-sm" />
                Remember me on this device
              </label>

              {/* Button */}
              <button
                type="submit"
                className="btn btn-primary w-full mt-3 flex gap-2"
              >
                Login to Account
                <LogIn size={18} />
              </button>
            </form>

            <p className="text-sm text-center mt-3">
              No account?{" "}
              <Link to={"/signup"} className="text-blue-600 cursor-pointer">
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
