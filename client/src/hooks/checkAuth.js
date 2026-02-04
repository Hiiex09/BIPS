import { useQuery } from "@tanstack/react-query";

export const checkAuth = () => {
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
