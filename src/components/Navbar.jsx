import { Link, useNavigate } from "react-router-dom";
import {
  Github,
  Plus,
  ChevronDown,
  Bell,
  Moon,
  Sun,
  Sparkles,
  LogOut,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useState, useEffect } from "react";
import { getCurrentUser, logoutUser } from "../services/authService";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check user authentication on mount
  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setShowUserMenu(false);
    navigate("/");
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "github-light":
        return <Sun className="w-4 h-4" />;
      case "celestis":
        return <Sparkles className="w-4 h-4" />;
      default:
        return <Moon className="w-4 h-4" />;
    }
  };

  const getThemeName = () => {
    switch (theme) {
      case "github-light":
        return "Light";
      case "celestis":
        return "Celestis";
      default:
        return "Dark";
    }
  };

  return (
    <nav className="w-full bg-github-header border-b border-github-border text-github-textPrimary sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 py-3 sm:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-github-textPrimary hover:text-github-blue transition-colors"
          >
            <Github className="w-8 h-8" />
          </Link>
          <div className="hidden md:flex space-x-2">
            <div className="flex bg-github-canvas border border-github-border rounded-md px-2 py-1 items-center min-w-[240px]">
              <span className="text-github-textMuted text-xs font-mono ml-2">
                Type / to search
              </span>
            </div>
          </div>
          <div className="hidden lg:flex space-x-4 text-sm font-semibold">
            <Link to="/domains" className="nav-link">
              Domains
            </Link>
            <Link to="/events" className="nav-link">
              My Events
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-github-textPrimary font-semibold">
          {!loading && !user ? (
            // Show Sign In / Sign Up buttons when not authenticated
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="btn-outline border-transparent text-sm px-3"
              >
                Sign In
              </Link>
              <Link to="/register" className="btn-primary text-sm py-2 px-4">
                Sign Up
              </Link>
            </div>
          ) : loading ? (
            // Loading state
            <div className="animate-pulse text-github-textMuted text-sm">
              Loading...
            </div>
          ) : (
            // Show user profile dropdown when authenticated
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <img
                  src={`https://avatars.dicebear.com/api/avataaars/${user?.email}.svg`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-github-border"
                />
                <span className="text-sm hidden sm:inline">
                  {user?.email?.split("@")[0]}
                </span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-github-canvas border border-github-border overflow-hidden">
                  <div className="px-4 py-3 border-b border-github-border">
                    <div className="text-sm font-semibold text-github-textPrimary truncate">
                      {user?.email}
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-github-border transition-colors flex items-center space-x-2 text-github-textPrimary"
                  >
                    <span>My Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-github-border transition-colors flex items-center space-x-2 border-t border-github-border text-github-textPrimary"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          )}

          <button className="hidden sm:flex items-center space-x-1 btn-outline border-transparent text-sm">
            <Plus className="w-4 h-4" />
            <ChevronDown className="w-3 h-3" />
          </button>

          <button className="hidden sm:flex items-center justify-center btn-outline border-transparent">
            <Bell className="w-4 h-4" />
          </button>

          {/* Theme Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="hidden sm:flex items-center space-x-1.5 btn-outline border-transparent text-sm px-3"
              title="Toggle theme"
            >
              {getThemeIcon()}
              <span className="hidden md:inline text-xs">{getThemeName()}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-github-canvas border border-github-border overflow-hidden">
                <button
                  onClick={() => {
                    if (theme !== "github-light") toggleTheme();
                    setShowThemeMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-github-border transition-colors flex items-center space-x-2 text-github-textPrimary"
                >
                  <Sun className="w-4 h-4" />
                  <span>Light</span>
                  {theme === "github-light" && (
                    <span className="ml-auto text-github-blue">✓</span>
                  )}
                </button>
                <button
                  onClick={() => {
                    if (theme !== "github-dark") {
                      if (theme === "github-light") toggleTheme();
                      else if (theme === "celestis") toggleTheme();
                    }
                    setShowThemeMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-github-border transition-colors flex items-center space-x-2 border-t border-github-border text-github-textPrimary"
                >
                  <Moon className="w-4 h-4" />
                  <span>Dark</span>
                  {theme === "github-dark" && (
                    <span className="ml-auto text-github-blue">✓</span>
                  )}
                </button>
                <button
                  onClick={() => {
                    if (theme !== "celestis") toggleTheme();
                    setShowThemeMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-github-border transition-colors flex items-center space-x-2 border-t border-github-border text-github-textPrimary"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Celestis (Cosmic)</span>
                  {theme === "celestis" && (
                    <span className="ml-auto text-github-blue">✓</span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sub Navbar area styling reminiscent of github repos */}
      <div className="bg-github-canvas border-b border-github-border pt-4">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex items-center text-xl pb-4">
            <span className="text-github-blue hover:underline cursor-pointer">
              Celestis
            </span>
            <span className="mx-2 text-github-textMuted font-light">/</span>
            <span className="text-github-blue hover:underline cursor-pointer font-bold">
              Open-Source-Week
            </span>
            <span className="ml-4 px-2 py-0.5 border border-github-border rounded-full text-xs text-github-textMuted font-medium flex items-center">
              Public
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
