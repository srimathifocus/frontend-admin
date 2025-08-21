import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  Users,
  User,
  X,
  Settings,
  Building2,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { admin } = useAuth();

  // Track which menu items are enabled based on backend availability/permissions
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    Dashboard: true, // assume core is available (validated endpoint below as well)
    Profile: true, // profile used by Auth flow
  });

  useEffect(() => {
    let cancelled = false;

    const runChecks = async () => {
      // Define endpoint checks for each feature
      const checks: { key: string; url: string }[] = [
        { key: "Dashboard", url: "/admin/dashboard" },
        { key: "Contacts", url: "/contact" },
        { key: "Demo Requests", url: "/demo" },
        { key: "Client Management", url: "/client" },
        { key: "Profile", url: "/auth/profile" },
      ];

      // Admin management only relevant for super admins
      if (admin?.role === "super_admin") {
        checks.push({ key: "Admin Management", url: "/admin/admins" });
      }

      try {
        const results = await Promise.all(
          checks.map(async (c) => {
            try {
              // Use validateStatus to avoid throwing on non-2xx
              const res = await api.get(c.url, {
                params: { limit: 1 },
                validateStatus: () => true,
              });
              const ok = res.status >= 200 && res.status < 300;
              return [c.key, ok] as const;
            } catch {
              return [c.key, false] as const;
            }
          })
        );

        if (!cancelled) {
          const map: Record<string, boolean> = {};
          for (const [k, v] of results) map[k] = v;
          setEnabled((prev) => ({ ...prev, ...map }));
        }
      } catch {
        // If the checks fail catastrophically, keep defaults
      }
    };

    runChecks();

    return () => {
      cancelled = true;
    };
  }, [admin?.role]);

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Contacts", href: "/contacts", icon: MessageSquare },
    { name: "Demo Requests", href: "/demos", icon: Calendar },
    { name: "Client Management", href: "/clients", icon: Building2 },
    ...(admin?.role === "super_admin"
      ? [{ name: "Admin Management", href: "/admins", icon: Users }]
      : []),
    { name: "Profile", href: "/profile", icon: User },
  ];

  const filteredNavigation = navigation.filter((item) => enabled[item.name]);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 transition-opacity lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md border-r-2 border-blue-500 transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:fixed lg:inset-y-0 lg:left-0
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              <span>AB</span>
            </div>
            <div className="ml-3">
              <span className="text-lg font-semibold text-gray-900">
                Admin Billing
              </span>
              <p className="text-[11px] text-gray-500">Management System</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors p-2"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-2">
          <div className="space-y-1">
            {filteredNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={`w-5 h-5 mr-3 ${
                        isActive ? "text-blue-600" : "text-gray-400"
                      }`}
                    />
                    <span className="font-medium">{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Admin card */}
        <div className="absolute bottom-4 left-3 right-3">
          <div className="rounded-lg p-3 border border-blue-100 bg-white">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <span>{admin?.username?.charAt(0).toUpperCase()}</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-gray-900">
                  {admin?.username}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {admin?.role?.replace("_", " ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
