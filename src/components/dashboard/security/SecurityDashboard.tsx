import { Link } from "react-router-dom";
import { FiCheckCircle, FiGrid, FiList } from "react-icons/fi";
import Card from "../../ui/Card";
import PageHeader from "../sidebar/PageHeader";
import Sidebar from "../sidebar/Sidebar";
import { useSecurityDashboard } from "../../../hooks/dashboard/useSecurityDashboard";

const sidebarItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <FiGrid size={18} />,
  },
  {
    label: "Verify Pass",
    path: "/verify-pass",
    icon: <FiCheckCircle size={18} />,
  },
  {
    label: "Access Logs",
    path: "/access-logs",
    icon: <FiList size={18} />,
  },
];

export default function SecurityDashboard() {
  const { data: stats } = useSecurityDashboard();

  return (
    <section className="min-h-screen w-full bg-estate-background">
      <Sidebar items={sidebarItems} />

      <main className="ml-0 px-4 pb-8 pt-20 sm:px-6 lg:ml-64 lg:px-8 lg:py-8">
        <div className="mx-auto w-full max-w-7xl space-y-8">
          <PageHeader
            title="Today's Activity"
            description="Monitor visitor access activity at your gate."
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            <Card>
              <p className="text-sm text-estate-muted">Total Checks</p>
              <p className="mt-2 text-3xl font-bold text-estate-text">
                {stats?.total_checks ?? 0}
              </p>
            </Card>

            <Card>
              <p className="text-sm text-estate-muted">Allowed</p>
              <p className="mt-2 text-3xl font-bold text-estate-text">
                {stats?.allowed ?? 0}
              </p>
            </Card>

            <Card>
              <p className="text-sm text-estate-muted">Denied</p>
              <p className="mt-2 text-3xl font-bold text-estate-text">
                {stats?.denied ?? 0}
              </p>
            </Card>
          </div>

          <Card className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-estate-text">
                Verify a Visitor Pass
              </h2>
              <p className="mt-1 text-sm text-estate-muted">
                Check a visitor's access code before allowing entry.
              </p>
            </div>
            <Link
              to="/verify-pass"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-estate-primary px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-estate-primary-dark"
            >
              Verify Pass
            </Link>
          </Card>

          <Card>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-estate-text">
                Recent Access Activity
              </h2>
              <p className="mt-1 text-sm text-estate-muted">
                Recent visitor pass verification activity.
              </p>
            </div>

            {stats?.recent_activity?.length ? (
              <div className="space-y-3">
                {stats.recent_activity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex flex-col gap-3 rounded-lg border border-estate-border p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-estate-text">
                        {activity.visitor ?? "Unknown visitor"}
                      </p>
                      <p className="mt-1 break-words text-xs text-estate-muted">
                        {activity.reason}
                      </p>
                    </div>

                    <div className="shrink-0 text-left sm:text-right">
                      <p
                        className={`text-sm font-medium ${
                          activity.result === "ALLOWED"
                            ? "text-estate-success"
                            : "text-estate-danger"
                        }`}
                      >
                        {activity.result === "ALLOWED" ? "Allowed" : "Denied"}
                      </p>
                      <p className="mt-1 text-xs text-estate-muted">
                        {new Date(activity.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-estate-border p-6 text-center">
                <p className="text-sm text-estate-muted">
                  No access activity yet.
                </p>
              </div>
            )}
          </Card>
        </div>
      </main>
    </section>
  );
}
