import { Link } from "react-router-dom";
import { FiGrid, FiShield, FiUsers } from "react-icons/fi";
import PageHeader from "../../components/dashboard/sidebar/PageHeader";
import Sidebar from "../../components/dashboard/sidebar/Sidebar";
import SecurityOfficerList from "../../features/security/SecurityList";

const sidebarItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <FiGrid size={18} />,
  },
  {
    label: "Residents",
    path: "/residents",
    icon: <FiUsers size={18} />,
  },
  {
    label: "Security Officers",
    path: "/security-officers",
    icon: <FiShield size={18} />,
  },
];

export default function SecurityOfficersPage() {
  return (
    <section className="min-h-screen w-full bg-estate-background">
      <Sidebar items={sidebarItems} />

      <main className="ml-0 px-4 pb-8 pt-20 sm:px-6 lg:ml-64 lg:px-8 lg:py-8">
        <div className="mx-auto w-full max-w-7xl space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <PageHeader
              title="Security Officers"
              description="View the security officers assigned to your estate."
            />
            <Link
              to="/security-officers/create"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-estate-primary px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-estate-primary-dark"
            >
              Add Security Officer
            </Link>
          </div>

          <SecurityOfficerList />
        </div>
      </main>
    </section>
  );
}
