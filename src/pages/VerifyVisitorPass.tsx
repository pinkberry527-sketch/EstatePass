import { useState } from "react";
import {
  FiCheckCircle,
  FiShield,
  FiAlertCircle,
  FiGrid,
  FiList,
} from "react-icons/fi";

import PageHeader from "../components/ui/PageHeader";
import Sidebar from "../components/dashboard/sidebar/Sidebar";
import { useVerifyVisitorPass } from "../hooks/visitorpass/useVerifyVisitorpass";
import { useGates } from "../hooks/visitorpass/useGates";

const sidebarItems = [
  { label: "Dashboard", path: "/dashboard", icon: <FiGrid size={18} /> },
  {
    label: "Verify Pass",
    path: "/verify-pass",
    icon: <FiCheckCircle size={18} />,
  },
  { label: "Access Logs", path: "/access-logs", icon: <FiList size={18} /> },
];

export default function VerifyVisitorPassPage() {
  const [accessCode, setAccessCode] = useState("");
  const [gateId, setGateId] = useState("");

  const {
    data: gates,
    isLoading: isGatesLoading,
    isError: isGatesError,
  } = useGates();

  const { mutate, data, isPending, isError, error } = useVerifyVisitorPass();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!gateId || !accessCode.trim()) {
      return;
    }

    mutate({
      access_code: accessCode.trim().toUpperCase(),
      gate_id: Number(gateId),
    });
  };

  return (
    <div className="min-h-screen bg-estate-background">
      <Sidebar items={sidebarItems} />

      <main className="ml-0 px-4 pb-8 pt-20 sm:px-6 lg:ml-64 lg:px-8 lg:py-8">
        <PageHeader
          title="Verify Visitor Pass"
          description="Verify a visitor's access pass before allowing entry."
        />

        <div className="mx-auto w-full max-w-3xl">
          {/* Verification Card */}
          <div className="rounded-2xl border border-estate-border bg-estate-surface shadow-sm">
            <div className="border-b border-estate-border p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-estate-background">
                  <FiShield size={22} className="text-estate-primary" />
                </div>

                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-estate-text">
                    Visitor Verification
                  </h2>

                  <p className="wrap-break-word text-sm text-estate-muted">
                    Check the visitor's pass details before granting access.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-4 sm:p-6">
              {/* Gate */}
              <div>
                <label
                  htmlFor="gate"
                  className="mb-2 block text-sm font-medium text-estate-text"
                >
                  Verification Gate
                </label>

                <select
                  id="gate"
                  value={gateId}
                  onChange={(event) => setGateId(event.target.value)}
                  disabled={isGatesLoading || isPending}
                  className="w-full rounded-lg border border-estate-border bg-estate-surface px-4 py-3 text-sm text-estate-text outline-none transition focus:border-estate-primary focus:ring-2 focus:ring-estate-primary/20 disabled:cursor-not-allowed disabled:bg-estate-background"
                >
                  <option value="">
                    {isGatesLoading
                      ? "Loading gates..."
                      : "Select the gate you're working at"}
                  </option>

                  {gates?.map((gate) => (
                    <option key={gate.id} value={gate.id}>
                      {gate.name}
                    </option>
                  ))}
                </select>

                {isGatesError && (
                  <p className="mt-2 text-sm text-estate-danger">
                    Unable to load gates. Please try again.
                  </p>
                )}
              </div>

              {/* Access Code */}
              <div>
                <label
                  htmlFor="accessCode"
                  className="mb-2 block text-sm font-medium text-estate-text"
                >
                  Visitor Access Code
                </label>

                <input
                  id="accessCode"
                  type="text"
                  value={accessCode}
                  onChange={(event) => setAccessCode(event.target.value)}
                  placeholder="e.g. 5EB2LRCT"
                  disabled={isPending}
                  autoComplete="off"
                  className="w-full rounded-lg border border-estate-border bg-estate-surface px-4 py-3 text-sm uppercase tracking-widest text-estate-text outline-none transition placeholder:normal-case placeholder:tracking-normal focus:border-estate-primary focus:ring-2 focus:ring-estate-primary/20 disabled:cursor-not-allowed disabled:bg-estate-background"
                />

                <p className="mt-2 text-xs text-estate-muted">
                  Enter the access code shown on the visitor's pass.
                </p>
              </div>

              {/* Error */}
              {isError && (
                <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                  <FiAlertCircle
                    size={20}
                    className="mt-0.5 shrink-0 text-estate-danger"
                  />

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-estate-danger">
                      Verification failed
                    </p>

                    <p className="mt-1 wrap-break-word text-sm text-estate-danger">
                      {error.message}
                    </p>
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={
                  isPending ||
                  !gateId ||
                  !accessCode.trim() ||
                  isGatesLoading ||
                  isGatesError
                }
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-estate-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-estate-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FiCheckCircle size={18} />

                {isPending ? "Verifying Pass..." : "Verify Visitor Pass"}
              </button>
            </form>
          </div>

          {/* Verification Result */}
          {data && (
            <div
              className={`mt-6 overflow-hidden rounded-2xl border shadow-sm ${
                data.valid
                  ? "border-green-200 bg-estate-surface"
                  : "border-red-200 bg-estate-surface"
              }`}
            >
              {/* Result Header */}
              <div
                className={`px-4 py-5 sm:px-6 ${
                  data.valid ? "bg-green-50" : "bg-red-50"
                }`}
              >
                <div className="flex items-start gap-3 sm:items-center sm:gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                      data.valid ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {data.valid ? (
                      <FiCheckCircle
                        size={26}
                        className="text-estate-success"
                      />
                    ) : (
                      <FiAlertCircle size={26} className="text-estate-danger" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        data.valid
                          ? "text-estate-success"
                          : "text-estate-danger"
                      }`}
                    >
                      Verification Result
                    </p>

                    <h2
                      className={`mt-1 text-xl font-bold ${
                        data.valid
                          ? "text-estate-success"
                          : "text-estate-danger"
                      }`}
                    >
                      {data.valid ? "ACCESS GRANTED" : "ACCESS DENIED"}
                    </h2>

                    <p className="mt-1 wrap-break-word text-sm text-estate-muted">
                      {data.reason}
                    </p>
                  </div>
                </div>
              </div>

              {/* Visitor Details */}
              {data.valid && data.pass && (
                <div className="p-4 sm:p-6">
                  <div className="mb-5">
                    <h3 className="text-sm font-semibold text-estate-text">
                      Visitor Details
                    </h3>

                    <p className="mt-1 text-xs text-estate-muted">
                      Confirm these details before allowing entry.
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-estate-muted">
                        Visitor
                      </p>

                      <p className="mt-1 wrap-break-word text-sm font-semibold text-estate-text">
                        {data.pass.visitor}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-estate-muted">
                        House
                      </p>

                      <p className="mt-1 wrap-break-word text-sm font-semibold text-estate-text">
                        {data.pass.house}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-estate-muted">
                        Host
                      </p>

                      <p className="mt-1 wrap-break-word text-sm font-semibold text-estate-text">
                        {data.pass.host}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-estate-muted">
                        Verification Gate
                      </p>

                      <p className="mt-1 wrap-break-word text-sm font-semibold text-estate-text">
                        {data.pass.gate ?? "Not assigned"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-estate-muted">
                        Visit Date
                      </p>

                      <p className="mt-1 text-sm font-semibold text-estate-text">
                        {data.pass.visit_date}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-estate-muted">
                        Status
                      </p>

                      <span className="mt-1 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-estate-success">
                        {data.pass.status}
                      </span>
                    </div>
                  </div>

                  {/* Access Time */}
                  <div className="mt-6 border-t border-estate-border pt-5">
                    <p className="text-xs font-medium uppercase tracking-wide text-estate-muted">
                      Visit Time
                    </p>

                    <p className="mt-1 text-sm font-semibold text-estate-text">
                      {data.pass.expected_arrival}
                      {data.pass.expected_departure &&
                        ` – ${data.pass.expected_departure}`}
                    </p>
                  </div>
                </div>
              )}

              {/* Denied Information */}
              {!data.valid && (
                <div className="p-4 sm:p-6">
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                    <p className="text-sm font-medium text-estate-danger">
                      Do not allow entry
                    </p>

                    <p className="mt-1 text-sm text-estate-muted">
                      The visitor's pass did not pass verification. Follow your
                      estate's security procedure before allowing access.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
