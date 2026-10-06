import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";
import { FiGrid, FiCheckCircle, FiList, FiLogOut } from "react-icons/fi";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-estate-border bg-estate-primary">
      <div className="border-b border-estate-border p-6">
        <h1 className="text-xl font-bold text-estate-text">EstatePass</h1>
      </div>

      <nav className="space-y-2 p-4">
        <button
          onClick={() => navigate("/dashboard")}
          className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
            isActive("/dashboard")
              ? "bg-estate-background text-estate-text"
              : "text-white hover:bg-estate-background hover:text-estate-text"
          }`}
        >
          <FiGrid size={18} />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => navigate("/verify-pass")}
          className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
            isActive("/verify-pass")
              ? "bg-estate-background text-estate-text"
              : "text-white hover:bg-estate-background hover:text-estate-text"
          }`}
        >
          <FiCheckCircle size={18} />
          <span>Verify Pass</span>
        </button>

        <button
          onClick={() => navigate("/access-logs")}
          className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
            isActive("/access-logs")
              ? "bg-estate-background text-estate-text"
              : "text-white hover:bg-estate-background hover:text-estate-text"
          }`}
        >
          <FiList size={18} />
          <span>Access Logs</span>
        </button>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-white transition-colors hover:bg-estate-background hover:text-estate-text"
        >
          <FiLogOut size={18} />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}
