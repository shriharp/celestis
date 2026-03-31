import { Link, useNavigate, useLocation } from "react-router-dom";
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
import { supabase } from "../lib/supabase";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  /* =========================
     🔐 AUTH HANDLING (FIXED)
  ========================= */
  useEffect(() => {
    let mounted = true;

    const checkUser = async () => {
      const res = await getCurrentUser();

      if (!mounted) return;

      if (res.success && res.user) {
        setUser(res.user);
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    checkUser();

    // 🔥 REAL-TIME AUTH LISTENER
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  /* =========================
     🚪 LOGOUT
  ========================= */
  const handleLogout = async () => {
    await logoutUser();
    setShowUserMenu(false);
    navigate("/");
  };

  /* =========================
     🎨 THEME HELPERS
  ========================= */
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

  /* =========================
     📍 BREADCRUMB
  ========================= */
  const getBreadcrumbText = () => {
    switch (location.pathname) {
      case "/domains":
        return "Domains";
      case "/events":
        return "My Events";
      default:
        return null;
    }
  };

  return (
    <nav className="w-full bg-github-header border-b border-github-border text-github-textPrimary sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 py-3 sm:px-6 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-github-blue transition-colors">
            <Github className="w-8 h-8" />
          </Link>

          <div className="hidden md:flex">
            <div className="flex bg-github-canvas border border-github-border rounded-md px-2 py-1 items-center min-w-[240px]">
              <span className="text-github-textMuted text-xs font-mono ml-2">
                Type / to search
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center space-x-3 font-semibold">
          {/* 🔐 AUTH UI */}
          {loading ? (
            <div className="animate-pulse text-github-textMuted text-sm">
              Loading...
            </div>
          ) : !user ? (
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
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu((prev) => !prev)}
                className="flex items-center space-x-2 hover:opacity-80"
              >
                <img
                  src={`https://avatars.dicebear.com/api/avataaars/${user.email}.svg`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-github-border"
                />
                <span className="text-sm hidden sm:inline">
                  {user.email.split("@")[0]}
                </span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-github-canvas border border-github-border">
                  <div className="px-4 py-3 border-b border-github-border text-sm font-semibold truncate">
                    {user.email}
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="block px-4 py-2 text-sm hover:bg-github-border"
                  >
                    My Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-github-border flex items-center space-x-2 border-t border-github-border"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* OTHER ICONS */}
          <button className="hidden sm:flex items-center space-x-1 btn-outline border-transparent text-sm">
            <Plus className="w-4 h-4" />
            <ChevronDown className="w-3 h-3" />
          </button>

          <button className="hidden sm:flex items-center btn-outline border-transparent">
            <Bell className="w-4 h-4" />
          </button>

          {/* THEME */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu((prev) => !prev)}
              className="hidden sm:flex items-center space-x-1.5 btn-outline border-transparent text-sm px-3"
            >
              {getThemeIcon()}
              <span className="hidden md:inline text-xs">
                {getThemeName()}
              </span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-github-canvas border border-github-border">
                <button
                  onClick={() => {
                    if (theme !== "github-light") toggleTheme();
                    setShowThemeMenu(false);
                  }}
                  className="w-full px-4 py-2 text-sm hover:bg-github-border flex items-center space-x-2"
                >
                  <Sun className="w-4 h-4" />
                  <span>Light</span>
                </button>

                <button
                  onClick={() => {
                    if (theme !== "github-dark") toggleTheme();
                    setShowThemeMenu(false);
                  }}
                  className="w-full px-4 py-2 text-sm hover:bg-github-border flex items-center space-x-2 border-t border-github-border"
                >
                  <Moon className="w-4 h-4" />
                  <span>Dark</span>
                </button>

                <button
                  onClick={() => {
                    if (theme !== "celestis") toggleTheme();
                    setShowThemeMenu(false);
                  }}
                  className="w-full px-4 py-2 text-sm hover:bg-github-border flex items-center space-x-2 border-t border-github-border"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Celestis</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-github-canvas border-b border-github-border pt-4">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex items-center text-xl pb-4">
            <span className="text-github-blue">Celestis</span>
            <span className="mx-2 text-github-textMuted">/</span>
            <span className="text-github-blue font-bold">
              Open-Source-Week
            </span>

            {getBreadcrumbText() && (
              <>
                <span className="mx-2 text-github-textMuted">/</span>
                <span className="text-github-blue font-semibold">
                  {getBreadcrumbText()}
                </span>
              </>
            )}

            <span className="ml-4 px-2 py-0.5 border border-github-border rounded-full text-xs text-github-textMuted">
              Public
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}