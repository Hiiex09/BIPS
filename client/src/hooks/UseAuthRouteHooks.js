import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { checkAuth, googleLoginUser, loginUser, logout, signupUser } from "../api/auth_api.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useCheckAuth = () => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: checkAuth,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });

  return { user, isLoading, error };
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Welcome back!");

      const role = data?.role || data?.user?.role;
      if (role === "Admin" || role === "Staff") {
        navigate("/welcome");
      } else {
        navigate("/Resident");
      }
    },
    onError: (err) => {
      const message = err.response?.data?.message || "Login failed. Please check your credentials.";
      toast.error(message);
    },
  });
};

export const useGoogleLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: googleLoginUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Signed in with Google successfully!");

      const role = data?.role || data?.user?.role;
      if (role === "Admin" || role === "Staff") {
        navigate("/welcome");
      } else {
        navigate("/Resident");
      }
    },
    onError: (err) => {
      const message = err.response?.data?.message || "Google sign-in failed. Please try again.";
      toast.error(message);
    },
  });
};

export const useSignup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Account created successfully! Please log in.");
      navigate("/login");
    },
    onError: (err) => {
      const message = err.response?.data?.message || "Signup failed";
      toast.error(message);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Logged out successfully");
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Logout failed");
    },
  });
};

// Aliases for backwards compatibility while migrating
export const checkAuthUsers = useCheckAuth;
export const loginAuthUsers = useLogin;
export const signupAuthUsers = useSignup;
export const logoutAuthUsers = useLogout;
