import { useQuery } from "@tanstack/react-query";
import { countAllResident } from "../api/user_api.js";

export const useResidentCount = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", "count"],
    queryFn: countAllResident,
  });

  return { data, isLoading, error };
};

// Backwards compatibility alias
export const getAllResidentCount = useResidentCount;
