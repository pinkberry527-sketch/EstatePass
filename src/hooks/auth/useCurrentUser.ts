import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "../../services/auth";

export function useCurrentUser(enabled: boolean) {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    enabled,
  });
}