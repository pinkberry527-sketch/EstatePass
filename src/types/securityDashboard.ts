export type SecurityDashboardActivity = {
  id: number;
  result: "ALLOWED" | "DENIED";
  reason: string;
  created_at: string;
  visitor: string | null;
};

export type SecurityDashboardStats = {
  total_checks: number;
  allowed: number;
  denied: number;
  recent_activity: SecurityDashboardActivity[];
};