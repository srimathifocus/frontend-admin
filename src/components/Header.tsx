import React from "react";
import { Menu, Sun, Moon, LogOut, User } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleThemeToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Theme toggle clicked, current theme:", theme);
    toggleTheme();
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-14 px-4 lg:px-6">
        <div className="flex items-center space-x-3">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden lg:block">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-lg text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>

          <div className="flex items-center space-x-2 rounded-lg p-1">
            <div className="hidden sm:block text-right mr-2">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {admin?.username}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {admin?.role?.replace("_", " ")}
              </p>
            </div>

            <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center">
              <span className="text-xs font-semibold text-white">
                {admin?.username?.charAt(0).toUpperCase()}
              </span>
            </div>

            <button
              onClick={handleProfileClick}
              className="p-2 rounded-lg text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              aria-label="Go to profile"
            >
              <User className="w-5 h-5" />
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
