import PageHeader from "../../components/ui/PageHeader";
import Sidebar from "../../components/dashboard/sidebar/Sidebar";
import { useAccessLogs } from "../../hooks/access_logs/useAccessLogs";
import { useState } from "react";
import { useAccessTracking } from "../../hooks/access_logs/useAccessTracking";
import { FiCheckCircle, FiGrid, FiList } from "react-icons/fi";

const sidebarItems = [
  { label: "Dashboard", path: "/dashboard", icon: <FiGrid size={18} /> },
  {
    label: "Verify Pass",
    path: "/verify-pass",
    icon: <FiCheckCircle size={18} />,
  },
  { label: "Access Logs", path: "/access-logs", icon: <FiList size={18} /> },
];

export default function AccessLogsPage() {
  const [filter, setFilter] = useState<"ALL" | "ALLOWED" | "DENIED">("ALL");
  const [page, setPage] = useState(1);
  const { checkIn, checkOut } = useAccessTracking();

  const { data: logs, isLoading, isError } = useAccessLogs(page);
  const filteredLogs =
    filter === "ALL"
      ? logs?.results
      : logs?.results.filter((log) => log.result === filter);

  const formatDateTime = (date: string) => {
    return (
      new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }) +
      " · " +
      new Date(date).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })
    );
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-estate-background">
      <Sidebar items={sidebarItems} />

      <main className="ml-0 px-4 pb-8 pt-20 sm:px-6 lg:ml-64 lg:px-8 lg:py-8">
        <PageHeader
          title="Access Logs"
          description="View visitor pass verification activity."
        />
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("ALL")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === "ALL"
                ? "bg-estate-primary text-white"
                : "bg-estate-surface text-estate-text hover:bg-estate-background"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("ALLOWED")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === "ALLOWED"
                ? "bg-estate-primary text-white"
                : "bg-estate-surface text-estate-text hover:bg-estate-background"
            }`}
          >
            Allowed
          </button>

          <button
            onClick={() => setFilter("DENIED")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === "DENIED"
                ? "bg-estate-primary text-white"
                : "bg-estate-surface text-estate-text hover:bg-estate-background"
            }`}
          >
            Denied
          </button>
        </div>

        <div className="rounded-xl border border-estate-border bg-estate-surface shadow-sm">
          {isLoading && (
            <div className="p-6 text-sm text-estate-muted">
              Loading access logs...
            </div>
          )}

          {isError && (
            <div className="p-6 text-sm text-estate-danger">
              Unable to load access logs.
            </div>
          )}

          {!isLoading && !isError && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left">
                <thead className="border-b border-estate-border bg-estate-background">
                  <tr>
                    <th className="px-8 py-4 text-sm font-semibold text-estate-text">
                      Visitor
                    </th>

                    <th className="px-8 py-4 text-sm font-semibold text-estate-text">
                      Gate
                    </th>

                    <th className="px-8 py-4 text-sm font-semibold text-estate-text">
                      Result
                    </th>

                    <th className="px-8 py-4 text-sm font-semibold text-estate-text">
                      Reason
                    </th>

                    <th className="px-8 py-4 text-sm font-semibold text-estate-text">
                      Date & Time
                    </th>
                    <th className="px-8 py-4 text-sm font-semibold text-estate-text">
                      Checked In
                    </th>
                    <th className="px-8 py-4 text-sm font-semibold text-estate-text">
                      Checked Out
                    </th>

                    <th className="px-8 py-4 text-sm font-semibold text-estate-text">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredLogs?.map((log) => (
                    <tr
                      key={log.id}
                      className="border-b border-estate-border last:border-b-0"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-estate-text">
                        {log.visitor ?? "Unknown visitor"}
                      </td>

                      <td className="px-6 py-4 text-sm text-estate-muted">
                        {log.gate ?? "Unknown gate"}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            log.result === "ALLOWED"
                              ? "bg-green-100 text-estate-success"
                              : "bg-red-100 text-estate-danger"
                          }`}
                        >
                          {log.result === "ALLOWED" ? "Allowed" : "Denied"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-estate-muted">
                        {log.reason || "—"}
                      </td>

                      <td className="px-6 py-4 text-sm text-estate-muted">
                        {formatDateTime(log.created_at)}
                      </td>

                      <td className="px-6 py-4 text-sm text-estate-muted">
                        {log.checked_in_at
                          ? formatTime(log.checked_in_at)
                          : "—"}
                      </td>

                      <td className="px-6 py-4 text-sm text-estate-muted">
                        {log.checked_out_at
                          ? new Date(log.checked_out_at).toLocaleTimeString()
                          : "—"}
                      </td>

                      <td className="px-6 py-4">
                        {log.result === "ALLOWED" && !log.checked_in_at && (
                          <button
                            onClick={() => checkIn.mutate(log.id)}
                            disabled={checkIn.isPending}
                            className="rounded-lg bg-estate-primary px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-estate-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {checkIn.isPending ? "Checking in..." : "Check In"}
                          </button>
                        )}

                        {log.checked_in_at && !log.checked_out_at && (
                          <button
                            onClick={() => checkOut.mutate(log.id)}
                            disabled={checkOut.isPending}
                            className="rounded-lg border border-estate-border bg-estate-surface px-3 py-2 text-xs font-medium text-estate-text transition-colors hover:bg-estate-background disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {checkOut.isPending
                              ? "Checking out..."
                              : "Check Out"}
                          </button>
                        )}

                        {log.checked_out_at && (
                          <span className="text-xs font-medium text-estate-muted">
                            Completed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}

                  {!filteredLogs?.length && (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-6 py-10 text-center text-sm text-estate-muted"
                      >
                        No access logs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="flex flex-col items-center gap-3 border-t border-estate-border px-4 py-4 sm:flex-row sm:justify-between sm:px-6">
                <button
                  onClick={() => setPage((currentPage) => currentPage - 1)}
                  disabled={!logs?.previous}
                  className="rounded-lg border border-estate-border px-4 py-2 text-sm font-medium text-estate-text transition-colors hover:bg-estate-background disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                <p className="text-sm text-estate-muted">
                  Page {page} · {logs?.count ?? 0} total logs
                </p>

                <button
                  onClick={() => setPage((currentPage) => currentPage + 1)}
                  disabled={!logs?.next}
                  className="rounded-lg border border-estate-border px-4 py-2 text-sm font-medium text-estate-text transition-colors hover:bg-estate-background disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
