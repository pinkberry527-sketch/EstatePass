import { useState } from "react";
import { FiCreditCard, FiGrid,  FiUsers } from "react-icons/fi";

import Sidebar from "../../components/dashboard/sidebar/Sidebar";
import PageHeader from "../../components/dashboard/sidebar/PageHeader";

import VisitorPasses from "../../features/visitorPase/VisitorPasses";
import CreateVisitorPass from "../../features/visitorPase/CreateVisitorPass";

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

export default function VisitorPassesPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen w-full bg-estate-background">
      <Sidebar items={sidebarItems} />

      <main className="ml-0 px-4 pb-8 pt-20 lg:ml-64 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-7xl">
          <PageHeader
            title="Visitor Passes"
            description="Create and manage visitor passes for your household."
          />

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="rounded-xl bg-estate-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              + Create Visitor Pass
            </button>
          </div>

          <div className="mt-6">
            {showForm ? (
              <div>
                {showForm ? (
                  <CreateVisitorPass onCancel={() => setShowForm(false)} />
                ) : (
                  <VisitorPasses />
                )}
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="mt-4 text-sm font-medium text-estate-muted hover:text-estate-text"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <VisitorPasses />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
