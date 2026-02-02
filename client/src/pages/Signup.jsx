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
    <div className="flex w-full flex-col lg:flex-row gap-5 pt-5 px-2">
      {/* LEFT INFO PANEL */}
      <div className="card bg-blue-500 rounded-box grid min-h place-items-center w-1/4">
        <div className="p-10">
          <div className="w-1/4 h-24 rounded-xl flex items-center justify-center backdrop-blur-md bg-white/15 border border-white/25 shadow-lg my-5">
            <ShieldUser size={60} className="text-white" />
          </div>

          <h1 className="text-white text-5xl w-3/4 font-bold">
            Digitalizing Barangay Services for a Better Community.
          </h1>

          <p className="w-3/4 my-5 text-white">
            Access local permits, view community announcements, and securely
            connect with your local officials from the comfort of your home.
          </p>

          <p className="w-3/4 inline-flex gap-3 my-3">
            <BadgeCheck fill="white" color="blue" size={25} />
            <span className="text-white">
              Official Government Record Access
            </span>
          </p>

          <p className="w-3/4 inline-flex gap-3 my-3">
            <BadgeCheck fill="white" color="blue" size={25} />
            <span className="text-white">
              Fast Document Processing (Barangay Clearance)
            </span>
          </p>

          <p className="w-3/4 inline-flex gap-3 my-3">
            <BadgeCheck fill="white" color="blue" size={25} />
            <span className="text-white">Secure Identity Verification</span>
          </p>

          <p className="w-md inline-flex gap-3 my-3 px-4 py-2 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg text-center">
            <LockKeyhole size={25} />
            <span className="text-white">
              End-to-End Encrypted & Secure Database
            </span>
          </p>
        </div>
      </div>

      {/* RIGHT SIGNUP CARD */}
      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 w-full">
        <div className="card bg-base-100 shadow-xl w-full max-w-md rounded-xl">
          <div className="p-8">
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
              <div className="grid grid-cols-2 gap-3">
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
                  <p className="text-xs text-gray-500">
                    PNG, JPG or PDF (Max 5MB)
                  </p>
                  <input type="file" hidden />
                </label>
              </div>

              {/* Submit */}
              <button className="btn btn-primary w-full mt-4">
                Register Account →
              </button>
            </form>
            {mode === "login" ? (
              <>
                <h2>Secure Resident Login</h2>
                {/* LOGIN FORM HERE */}
                <p className="text-sm text-center mt-3">
                  No account?{" "}
                  <span
                    onClick={() => setMode("signup")}
                    className="text-blue-600 cursor-pointer"
                  >
                    Register here
                  </span>
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-center mt-3">
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    onClick={() => setMode("login")}
                    className="text-blue-600 cursor-pointer"
                  >
                    Login here
                  </Link>
                </p>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="border-t px-8 py-6 text-center space-y-3">
            <p className="text-xs text-gray-500 leading-relaxed">
              By registering, you agree to our
              <span className="text-blue-600 mx-1 cursor-pointer">
                Terms of Service
              </span>
              and
              <span className="text-blue-600 mx-1 cursor-pointer">
                Privacy Policy
              </span>
              . We process your data according to the Data Privacy Act of 2012.
            </p>
          </div>

          <div className="flex justify-evenly items-center py-5">
            <span className="text-xs flex gap-1">
              <ShieldCheck size={20} fill="green" color="white" />
              Official Barangay Tejero Portal
            </span>

            <span className="text-xs flex gap-1">
              <CircleSmall size={15} fill="gray" color="white" />
              Support: barangay.tejero@gmail.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
