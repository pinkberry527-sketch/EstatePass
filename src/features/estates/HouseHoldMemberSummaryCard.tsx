import { FiUsers } from "react-icons/fi";
import { useHouseholdMembers } from "../../hooks/estate/useHouseholdmenbers";

export default function HouseholdMembersSummary() {
  const {
    data: householdMembers = [],
    isLoading,
  } = useHouseholdMembers();

  return (
    <div className="rounded-2xl border border-estate-border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-estate-text">
            Household Members
          </h2>

          <p className="mt-1 text-sm text-estate-muted">
            People registered under your household.
          </p>
        </div>

        <FiUsers
          size={22}
          className="text-estate-primary"
        />
      </div>

      <div className="mt-6">
        {isLoading ? (
          <p className="text-sm text-estate-muted">
            Loading household members...
          </p>
        ) : householdMembers.length === 0 ? (
          <p className="text-sm text-estate-muted">
            No household members have been added yet.
          </p>
        ) : (
          <div className="space-y-3">
            {householdMembers.slice(0, 3).map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-xl bg-estate-background px-4 py-3"
              >
                <div>
                  <p className="font-medium text-estate-text">
                    {member.first_name} {member.last_name}
                  </p>

                  <p className="text-sm text-estate-muted">
                    {member.relationship}
                  </p>
                </div>

                {member.phone_number && (
                  <p className="text-sm text-estate-muted">
                    {member.phone_number}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}