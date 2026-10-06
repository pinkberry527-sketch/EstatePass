
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";

import { useAuth } from "../../../hooks/auth/useAuth";
import { useLogout } from "../../../hooks/auth/useLogout";

type SidebarItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

type SidebarProps = {
  items: SidebarItem[];
};

export default function Sidebar({ items }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const { logout } = useAuth();
  const { mutate: logoutUser, isPending } = useLogout();

  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) =>
    location.pathname === path;

  function handleNavigation(path: string) {
    navigate(path);
    setIsOpen(false);
  }

  function handleLogout() {
    logoutUser(undefined, {
      onSuccess: () => {
        logout();
        navigate("/login");
        setIsOpen(false);
      },
    });
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-estate-primary p-3 text-white shadow-md lg:hidden"
        aria-label="Open navigation menu"
      >
        <FiMenu size={22} />
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label="Close navigation menu"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 border-r border-estate-border bg-estate-primary transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between border-b border-estate-border p-6">
          <h1 className="text-xl font-bold text-white">
            EstatePass
          </h1>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-white lg:hidden"
            aria-label="Close navigation menu"
          >
            <FiX size={22} />
          </button>
        </div>

        <nav className="space-y-2 p-4">
          {items.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() =>
                handleNavigation(item.path)
              }
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? "bg-estate-background text-estate-text"
                  : "text-white hover:bg-estate-background hover:text-estate-text"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}

          <button
            type="button"
            onClick={handleLogout}
            disabled={isPending}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-white transition-colors hover:bg-estate-background hover:text-estate-text disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiLogOut size={18} />

            <span>
              {isPending ? "Logging out..." : "Logout"}
            </span>
          </button>
        </nav>
      </aside>
    </>
  );
}

