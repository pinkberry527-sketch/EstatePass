import { FiGrid, FiUsers, FiCreditCard } from "react-icons/fi";

import Sidebar from "../../components/dashboard/sidebar/Sidebar";
import HouseholdMembers from "../../features/estates/HouseHoldMembers";
import { useState } from "react";
import AddHouseholdMember from "../../features/estates/AddHouseHoldMember";

const sidebarItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <FiGrid size={18} />,
  },
 
  {
    label: "Household Members",
    path: "/household-members",
    icon: <FiUsers size={18} />,
  },
  {
    label: "Visitor Passes",
    path: "/visitor-passes",
    icon: <FiCreditCard size={18} />,
  },
];

export default function HouseholdMembersPage() {
  const [showForm, setShowForm] = useState(false);
  return (
    <section className="min-h-screen w-full bg-estate-background">
      <Sidebar items={sidebarItems} />

      <div className="ml-0 px-4 pb-8 pt-20 lg:ml-64 lg:px-8 lg:py-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-estate-text">
                Household Members
              </h1>

              <p className="mt-1 text-sm text-estate-muted">
                Manage the members of your household.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="inline-flex w-full items-center justify-center rounded-xl bg-estate-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto"
            >
              + Add Member
            </button>
          </div>
          {showForm && (
            <AddHouseholdMember onCancel={() => setShowForm(false)} />
          )}

          <HouseholdMembers />
        </div>
      </div>
    </section>
  );
}
