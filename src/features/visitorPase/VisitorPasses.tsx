import { useState } from "react";
import { FiCheck, FiCopy, FiCreditCard } from "react-icons/fi";

import {
  useVisitorPasses,
  useActivateVisitorPass,
} from "../../hooks/visitorpass/useVisitorPasses";

export default function VisitorPasses() {
  const { data: visitorPasses = [], isLoading, isError } = useVisitorPasses();

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const activateVisitorPass = useActivateVisitorPass();

  async function handleCopy(accessCode: string) {
    await navigator.clipboard.writeText(accessCode);

    setCopiedCode(accessCode);

    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  }

  async function handleActivate(passId: number) {
    try {
      await activateVisitorPass.mutateAsync(passId);
    } catch (error) {
      console.error("Failed to activate visitor pass:", error);
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-estate-border bg-white p-6 shadow-sm">
        <p className="text-sm text-estate-muted">Loading visitor passes...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <p className="text-sm text-red-600">
          Unable to load visitor passes. Please try again.
        </p>
      </div>
    );
  }

  if (visitorPasses.length === 0) {
    return (
      <div className="rounded-2xl border border-estate-border bg-white p-8 text-center shadow-sm sm:p-10">
        <FiCreditCard size={30} className="mx-auto text-estate-muted" />

        <h2 className="mt-4 text-lg font-semibold text-estate-text">
          No visitor passes yet
        </h2>

        <p className="mx-auto mt-1 max-w-sm text-sm text-estate-muted">
          Create a visitor pass when you are expecting a visitor.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {visitorPasses.map((visitorPass) => (
        <div
          key={visitorPass.id}
          className="overflow-hidden rounded-2xl border border-estate-border bg-white shadow-sm"
        >
          {/* Access Code */}
          <div className="border-b border-estate-border bg-estate-background px-4 py-5 sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-estate-muted">
                  Visitor Access Code
                </p>

                <div className="mt-2 flex items-center gap-2 sm:gap-3">
                  <p className="truncate text-2xl font-bold tracking-[0.12em] text-estate-text sm:text-3xl">
                    {visitorPass.access_code}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleCopy(visitorPass.access_code)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-estate-border bg-white text-estate-text transition hover:bg-estate-primary hover:text-white"
                    title="Copy access code"
                  >
                    {copiedCode === visitorPass.access_code ? (
                      <FiCheck size={16} />
                    ) : (
                      <FiCopy size={16} />
                    )}
                  </button>
                </div>

                {copiedCode === visitorPass.access_code ? (
                  <p className="mt-2 text-xs font-medium text-estate-primary">
                    Access code copied
                  </p>
                ) : (
                  <p className="mt-2 text-xs text-estate-muted">
                    Share this code with your visitor.
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="w-fit rounded-full bg-estate-primary/10 px-3 py-1 text-xs font-medium text-estate-primary">
                  {visitorPass.status}
                </span>

                {visitorPass.status === "PENDING" && (
                  <button
                    type="button"
                    onClick={() => handleActivate(visitorPass.id)}
                    disabled={activateVisitorPass.isPending}
                    className="rounded-lg bg-estate-primary px-3 py-1.5 text-xs font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {activateVisitorPass.isPending
                      ? "Activating..."
                      : "Activate Pass"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Visitor Details */}
          <div className="px-4 py-5 sm:px-6 sm:py-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-estate-muted">
                Visitor
              </p>

              <p className="mt-1 text-base font-semibold text-estate-text sm:text-lg">
                {visitorPass.visitor.first_name} {visitorPass.visitor.last_name}
              </p>

              <p className="mt-1 text-sm text-estate-muted">
                {visitorPass.visitor.phone_number}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-estate-muted">
                  Visit Date
                </p>

                <p className="mt-1 text-sm font-medium text-estate-text">
                  {visitorPass.visit_date}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-estate-muted">
                  Arrival
                </p>

                <p className="mt-1 text-sm font-medium text-estate-text">
                  {visitorPass.expected_arrival}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-estate-muted">
                  Departure
                </p>

                <p className="mt-1 text-sm font-medium text-estate-text">
                  {visitorPass.expected_departure || "Not specified"}
                </p>
              </div>
            </div>

            {visitorPass.purpose && (
              <div className="mt-5">
                <p className="text-xs font-medium uppercase tracking-wide text-estate-muted">
                  Purpose
                </p>

                <p className="mt-1 text-sm text-estate-text">
                  {visitorPass.purpose}
                </p>
              </div>
            )}

            {visitorPass.notes && (
              <div className="mt-5">
                <p className="text-xs font-medium uppercase tracking-wide text-estate-muted">
                  Notes
                </p>

                <p className="mt-1 text-sm text-estate-text">
                  {visitorPass.notes}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
