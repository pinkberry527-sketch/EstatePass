import Sidebar from "../sidebar/Sidebar";
import PageHeader from "../sidebar/PageHeader";
import { FiGrid,  FiUsers, FiCreditCard } from "react-icons/fi";
import MyHouseSummary from "../../../features/estates/MyHouseSummary";
import { useAuth } from "../../../hooks/auth/useAuth";
import HouseholdMembersSummary from "../../../features/estates/HouseHoldMemberSummaryCard";

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



export default function ResidentDashboard() {
  const { user } = useAuth();
  return (
    <section className="min-h-screen w-full bg-estate-background">
      <Sidebar items={sidebarItems} />

      <div className="ml-0 px-4 pb-8 pt-20 lg:ml-64 lg:px-8 lg:py-8">
        <div className="mx-auto w-full max-w-7xl space-y-8">
          <PageHeader
            title={`Welcome, ${user?.first_name || "Resident"}`}
            description="Manage your home and visitors from one place."
          />

          <MyHouseSummary />

          <HouseholdMembersSummary />
        </div>
      </div>
    </section>
  );
}