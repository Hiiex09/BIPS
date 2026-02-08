import { useQuery } from "@tanstack/react-query";
import { countAllResident } from "../api/user_api.js";

export const getAllResidentCount = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: countAllResident,
  });

  return { data, isLoading, error };
};
