import api from "../api/axios";
import type { SecurityDashboardStats } from "../types/securityDashboard";

export const getSecurityDashboardStats =
  async (): Promise<SecurityDashboardStats> => {
    const response = await api.get("security-dashboard/");

    return response.data;
  };