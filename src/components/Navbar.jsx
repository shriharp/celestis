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
import { getDomains } from "../services/eventsService";
import { supabase } from "../lib/supabase";
import mossGithubLogo from "../images/moss_github_1.png";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [domainNames, setDomainNames] = useState({});

  useEffect(() => {
    const init = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser || null);

      setLoading(false);
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth event:", event);

        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const loadDomains = async () => {
      const domains = await getDomains();

      setDomainNames(
        domains.reduce((acc, domain) => {
          acc[domain.id] = domain.name;
          return acc;
        }, {}),
      );
    };

    loadDomains();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
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

  const routeNames = {
    events: "My Events",
    domains: "Domains",
  };

  const formatSegment = (segment) =>
    segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  const getBreadcrumbs = () => {
    const path = location.pathname.split("/").filter(Boolean);

    if (path[0] === "domains") {
      const crumbs = [
        {
          name: routeNames.domains,
          path: "/domains",
        },
      ];

      if (path[1]) {
        crumbs.push({
          name: domainNames[path[1]] || formatSegment(path[1]),
          path: `/domains/${path[1]}`,
        });
      }

      return crumbs;
    }

    let currentPath = "";

    return path.map((segment) => {
      currentPath += `/${segment}`;

      return {
        name: routeNames[segment] || formatSegment(segment),
        path: currentPath,
      };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav className="w-full bg-github-header border-b border-github-border text-github-textPrimary sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 py-3 sm:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="hover:opacity-80 transition-opacity flex items-center"
          >
            <img
              src={mossGithubLogo}
              alt="MOSS GitHub Logo"
              className="w-12 h-12 object-contain"
            />
          </Link>
          <div className="hidden md:flex space-x-2">
            <div className="flex bg-github-canvas border border-github-border rounded-md px-2 py-1 items-center min-w-[240px]">
              <span className="text-github-textMuted text-xs font-mono ml-2">
                Type / to search
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 font-semibold">
          {!loading && !user ? (
            <div className="flex space-x-2">
              <Link to="/login" className="btn-outline text-sm px-3">
                Sign In
              </Link>
              <Link to="/register" className="btn-primary text-sm px-4">
                Sign Up
              </Link>
            </div>
          ) : loading ? (
            <div className="text-sm text-github-textMuted">Loading...</div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2"
              >
                <img
                  src={`https://avatars.dicebear.com/api/avataaars/${user?.email}.svg`}
                  className="w-8 h-8 rounded-full"
                />
                <span className="hidden sm:inline text-sm">
                  {user?.email?.split("@")[0]}
                </span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-github-canvas border border-github-border rounded-md">
                  <div className="px-4 py-3 border-b">{user?.email}</div>

                  <Link
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="block px-4 py-2 hover:bg-github-border"
                  >
                    My Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-github-border border-t"
                  >
                    <LogOut className="w-4 h-4 inline mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}

          <button onClick={toggleTheme} className="btn-outline px-3 text-sm">
            {getThemeIcon()} {getThemeName()}
          </button>
        </div>
      </div>

      <div className="bg-github-canvas border-b border-github-border pt-4">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center text-xl pb-4 flex-wrap">
            <span
              onClick={() => navigate("/")}
              className="text-github-blue hover:underline cursor-pointer"
            >
              Celestis
            </span>

            <span className="mx-2 text-github-textMuted">/</span>

            <span
              onClick={() => navigate("/")}
              className="text-github-blue hover:underline cursor-pointer font-bold"
            >
              Open-Source-Week
            </span>

            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.path} className="flex items-center">
                <span className="mx-2 text-github-textMuted">/</span>

                <span
                  onClick={() => navigate(crumb.path)}
                  className={`cursor-pointer hover:underline ${
                    index === breadcrumbs.length - 1
                      ? "text-github-blue font-semibold"
                      : "text-github-blue"
                  }`}
                >
                  {crumb.name}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
