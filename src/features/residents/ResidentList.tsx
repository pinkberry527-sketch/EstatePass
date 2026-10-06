import { useResidents } from "../../hooks/residents/useCreateResident";

export default function ResidentList() {
  const {
    data: residents,
    isLoading,
    isError,
  } = useResidents();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-20 w-full animate-pulse rounded-xl border border-estate-border bg-estate-surface"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-5">
        <p className="text-sm font-medium text-red-700">
          Unable to load residents.
        </p>

        <p className="mt-1 text-sm text-red-600">
          Please refresh the page and try again.
        </p>
      </div>
    );
  }

  if (!residents?.length) {
    return (
      <div className="rounded-xl border border-estate-border bg-estate-surface px-6 py-12 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-estate-background">
          <span className="text-lg text-estate-muted">
            —
          </span>
        </div>

        <h3 className="mt-4 text-base font-semibold text-estate-text">
          No residents yet
        </h3>

        <p className="mx-auto mt-1 max-w-sm text-sm text-estate-muted">
          Residents added to your estate will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-estate-border bg-estate-surface">
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-175">
          <thead>
            <tr className="border-b border-estate-border bg-estate-background/60">
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-estate-muted">
                Resident
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-estate-muted">
                Contact
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-estate-muted">
                House
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-estate-muted">
                Relationship
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-estate-muted">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {residents.map((resident) => (
              <tr
                key={resident.id}
                className="border-b border-estate-border last:border-b-0 hover:bg-estate-background/40"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-estate-primary/10 text-sm font-semibold text-estate-primary">
                      {resident.first_name
                        .charAt(0)
                        .toUpperCase()}
                      {resident.last_name
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-estate-text">
                        {resident.first_name}{" "}
                        {resident.last_name}
                      </p>

                      <p className="text-xs text-estate-muted">
                        Resident #{resident.id}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <p className="max-w-55 truncate text-sm text-estate-text">
                    {resident.email}
                  </p>

                  <p className="mt-1 text-xs text-estate-muted">
                    {resident.phone_number || "No phone number"}
                  </p>
                </td>

                <td className="px-5 py-4">
                  <span className="inline-flex rounded-lg bg-estate-background px-3 py-1.5 text-sm font-medium text-estate-text">
                    {resident.house?.property_number || "Not assigned"}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span className="text-sm capitalize text-estate-text">
                    {resident.house?.relationship_type
                      ?.toLowerCase()
                      .replace("_", " ") || "—"}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="divide-y divide-estate-border md:hidden">
        {residents.map((resident) => (
          <div
            key={resident.id}
            className="p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-estate-primary/10 text-sm font-semibold text-estate-primary">
                  {resident.first_name
                    .charAt(0)
                    .toUpperCase()}
                  {resident.last_name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-estate-text">
                    {resident.first_name}{" "}
                    {resident.last_name}
                  </p>

                  <p className="truncate text-xs text-estate-muted">
                    {resident.email}
                  </p>
                </div>
              </div>

              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Active
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-estate-background p-3">
                <p className="text-xs text-estate-muted">
                  House
                </p>

                <p className="mt-1 text-sm font-medium text-estate-text">
                  {resident.house?.property_number ||
                    "Not assigned"}
                </p>
              </div>

              <div className="rounded-lg bg-estate-background p-3">
                <p className="text-xs text-estate-muted">
                  Relationship
                </p>

                <p className="mt-1 text-sm font-medium capitalize text-estate-text">
                  {resident.house?.relationship_type
                    ?.toLowerCase()
                    .replace("_", " ") || "—"}
                </p>
              </div>
            </div>

            {resident.phone_number && (
              <p className="mt-3 text-xs text-estate-muted">
                {resident.phone_number}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}