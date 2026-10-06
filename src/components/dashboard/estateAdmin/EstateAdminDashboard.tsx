import { Link } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import PageHeader from "../sidebar/PageHeader";
import { FiGrid, FiUsers, FiShield } from "react-icons/fi";

import {
  useResidents,
  useHouses,
  useSecurityOfficers,
} from "../../../hooks/residents/useCreateResident";

export default function EstateAdminDashboard() {
  const { data: residents = [] } = useResidents();
  const totalResidents = residents.length;

  const { data: houses = [] } = useHouses();

  const totalHouses = houses.length;
  const { data: securityOfficers = [] } = useSecurityOfficers();

  const totalSecurityOfficers = securityOfficers.length;

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
  return (
    <section className="min-h-screen w-full bg-estate-background">
      <Sidebar items={sidebarItems} />

      <div className="ml-0 px-4 pb-8 pt-20 lg:ml-64 lg:px-8 lg:py-8">
        <div className="mx-auto w-full max-w-7xl space-y-8"></div>
        {/* Header */}
        <PageHeader
          title="Estate Admin"
          description="Manage your estate from one place."
        />

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Residents */}
          <div className="rounded-2xl border border-estate-border bg-estate-surface p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-estate-muted">
                  Total Residents
                </p>

                <p className="mt-3 text-3xl font-semibold text-estate-text">
                  {totalResidents}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-estate-primary/10">
                👥
              </div>
            </div>

            <p className="mt-4 text-xs text-estate-muted">
              Residents in your estate
            </p>
          </div>

          {/* Houses */}
          <div className="rounded-2xl border border-estate-border bg-estate-surface p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-estate-muted">
                  Total Houses
                </p>

                <p className="mt-3 text-3xl font-semibold text-estate-text">
                  {totalHouses}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-estate-primary/10">
                🏠
              </div>
            </div>

            <p className="mt-4 text-xs text-estate-muted">
              Houses in your estate
            </p>
          </div>

          {/* Security Officers */}
          <div className="rounded-2xl border border-estate-border bg-estate-surface p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-estate-muted">
                  Security Officers
                </p>

                <p className="mt-3 text-3xl font-semibold text-estate-text">
                  {totalSecurityOfficers}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-estate-primary/10">
                🛡️
              </div>
            </div>

            <p className="mt-4 text-xs text-estate-muted">
              Security officers in your estate
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-estate-text">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-estate-muted">
              Manage people in your estate.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Add Resident */}
            <Link
              to="/residents/create"
              className="group rounded-2xl border border-estate-border bg-estate-surface p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-estate-primary/30 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-estate-primary/10 text-xl text-estate-primary">
                  +
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-estate-text">
                    Add Resident
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-estate-muted">
                    Create a resident account and assign them to a house.
                  </p>
                </div>
              </div>
            </Link>

            {/* Add Security Officer */}
            <Link
              to="/security-officers/create"
              className="group rounded-2xl border border-estate-border bg-estate-surface p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-estate-primary/30 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-estate-primary/10 text-xl text-estate-primary">
                  +
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-estate-text">
                    Add Security Officer
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-estate-muted">
                    Add a security officer to your estate.
                  </p>

                  
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
