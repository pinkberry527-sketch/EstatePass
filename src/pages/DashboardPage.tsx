import EstateAdminDashboard from "../components/dashboard/estateAdmin/EstateAdminDashboard";
import SecurityDashboard from "../components/dashboard/security/SecurityDashboard";
import ResidentDashboard from "../components/dashboard/resident/ResidentDashboard";
// import PlatformAdminDashboard from "../components/dashboard/platformAdmin/PlatformAdminDashboard";

import { useAuth } from "../hooks/auth/useAuth";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-estate-background">
        <p className="text-sm text-estate-muted">Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  switch (user.role) {
    case "ESTATE_ADMIN":
      return <EstateAdminDashboard />;

    case "SECURITY":
      return <SecurityDashboard />;

    case "RESIDENT":
      return <ResidentDashboard />;

    // case "PLATFORM_ADMIN":
    //   return <PlatformAdminDashboard />;

    default:
      return (
        <div className="flex min-h-screen items-center justify-center bg-estate-background">
          <p className="text-sm text-red-600">
            You do not have access to a dashboard.
          </p>
        </div>
      );
  }
}
