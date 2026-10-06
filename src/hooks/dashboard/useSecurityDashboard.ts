import { useQuery } from "@tanstack/react-query";

import { getSecurityDashboardStats } from "../../services/securityDashboard";

export function useSecurityDashboard() {
  return useQuery({
    queryKey: ["security-dashboard"],
    queryFn: getSecurityDashboardStats,
  });
}