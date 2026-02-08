import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { checkAuth, loginUser, logout } from "../api/auth_api.js";
import { useNavigate } from "react-router-dom";

export const checkAuthUsers = () => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: checkAuth,
    staleTime: Infinity,
  });

  return { user, isLoading, error };
};

export const loginAuthUsers = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["users"]);

      // Role-based redirect
      if (data.user.role === "Admin" || data.user.role === "Staff") {
        navigate("/welcome");
      } else {
        navigate("/Resident");
      }
    },
  });
};

export const logoutAuthUsers = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      console.log(`Logged out successfully`);
      queryClient.invalidateQueries(["users"]);

      navigate("/");
    },
  });
};
