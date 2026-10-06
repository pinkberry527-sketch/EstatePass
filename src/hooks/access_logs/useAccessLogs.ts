
import { useQuery } from "@tanstack/react-query";

import { getAccessLogs } from "../../services/accessLogs";

export function useAccessLogs(page: number) {
  return useQuery({
    queryKey: ["access-logs", page],
    queryFn: () => getAccessLogs(page),
  });
}

