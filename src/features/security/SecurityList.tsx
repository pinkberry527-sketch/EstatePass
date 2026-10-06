import { useSecurityOfficers } from "../../hooks/residents/useCreateResident";

export default function SecurityOfficerList() {
  const {
    data: securityOfficers = [],
    isLoading,
    isError,
  } = useSecurityOfficers();

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-estate-border bg-estate-surface p-6 shadow-sm">
        <p className="text-sm text-estate-muted">
          Loading security officers...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-estate-surface p-6 shadow-sm">
        <p className="text-sm text-red-600">
          Unable to load security officers.
        </p>
      </div>
    );
  }

  if (securityOfficers.length === 0) {
    return (
      <div className="rounded-2xl border border-estate-border bg-estate-surface p-8 text-center shadow-sm">
        <h3 className="text-base font-semibold text-estate-text">
          No security officers yet
        </h3>

        <p className="mt-2 text-sm text-estate-muted">
          Add a security officer to start managing your estate security team.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-estate-border bg-estate-surface shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-160 text-left">
          <thead className="border-b border-estate-border bg-estate-background">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-estate-text">
                Name
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-estate-text">
                Email
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-estate-text">
                Phone
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-estate-text">
                Role
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-estate-border">
            {securityOfficers.map((officer) => (
              <tr key={officer.id}>
                <td className="px-6 py-4 text-sm font-medium text-estate-text">
                  {officer.first_name} {officer.last_name}
                </td>

                <td className="px-6 py-4 text-sm text-estate-muted">
                  {officer.email}
                </td>

                <td className="px-6 py-4 text-sm text-estate-muted">
                  {officer.phone_number || "—"}
                </td>

                <td className="px-6 py-4 text-sm text-estate-muted">
                  Security Officer
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}