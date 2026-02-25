import { useState } from "react";
import { Link } from "react-router-dom";

import {
  BadgeCheck,
  CircleSmall,
  LockKeyhole,
  ShieldCheck,
  ShieldUser,
  Upload,
} from "lucide-react";

export const Signup = () => {
  const [mode, setMode] = useState("signup");

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

      {/* Right Signup Card */}
      <div className="flex-1 flex items-center justify-center bg-base-200 px-4 py-8 sm:py-12">
        <div className="card bg-base-100 shadow-xl w-full max-w-md rounded-xl">
          <div className="p-6 sm:p-8">
            {/* Tabs */}
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
            <h2 className="text-2xl font-bold mb-2">Create Resident Account</h2>
            <p className="text-gray-500 text-sm mb-6">
              Enter your details to join the barangay portal
            </p>

            {/* FORM */}
            <form className="space-y-4">
              {/* First + Last Name */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-sm font-medium">First Name</span>
                  <input
                    type="text"
                    placeholder="Juan"
                    className="input input-bordered w-full mt-1"
                  />
                </div>
                <div>
                  <span className="text-sm font-medium">Last Name</span>
                  <input
                    type="text"
                    placeholder="Dela Cruz"
                    className="input input-bordered w-full mt-1"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <span className="text-sm font-medium">Full Home Address</span>
                <textarea
                  className="textarea textarea-bordered w-full mt-1"
                  placeholder="Bldg No., Street, Barangay, City/Municipality"
                ></textarea>
              </div>

              {/* Contact + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-sm font-medium">Contact Number</span>
                  <input
                    type="tel"
                    placeholder="+63 912 345 6789"
                    className="input input-bordered w-full mt-1"
                  />
                </div>
                <div>
                  <span className="text-sm font-medium">Email Address</span>
                  <input
                    type="email"
                    placeholder="juan@example.com"
                    className="input input-bordered w-full mt-1"
                  />
                </div>
              </div>

              {/* ID Upload */}
              <div>
                <span className="text-sm font-medium">
                  Resident ID Upload (Valid ID)
                </span>
                <label className="border border-dashed rounded-lg mt-2 p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-base-200 transition">
                  <Upload size={30} className="mb-2 text-blue-600" />
                  <p className="text-sm font-semibold">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG or PDF (Max 5MB)</p>
                  <input type="file" hidden />
                </label>
              </div>

              {/* Submit */}
              <button className="btn btn-primary w-full mt-4">
                Register Account →
              </button>
            </form>

            <p className="text-sm text-center mt-3">
              Already have an account?{" "}
              <Link to={"/login"} className="text-blue-600 cursor-pointer">
                Login here
              </Link>
            </p>
          </div>

          {/* Footer */}
          <div className="border-t px-6 sm:px-8 py-5 text-center space-y-3">
            <p className="text-xs text-gray-500 leading-relaxed">
              By registering, you agree to our
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

export default Signup;
