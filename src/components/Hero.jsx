import {
  BookOpen,
  Star,
  GitFork,
  Activity,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";

export default function Hero() {
  const navigate = useNavigate();
  // 🔥 ref for h1
  const headingRef = useRef(null);
  useEffect(() => {
    const hasScrolled = sessionStorage.getItem("heroScrolled");

    if (!hasScrolled) {
      scrollToHeading();
      sessionStorage.setItem("heroScrolled", "true");
    }
  }, []);
  const scrollToHeading = () => {
    headingRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="w-full bg-github-bg">
      <div className="max-w-[1400px] mx-auto px-4 pt-5">
        {/* GitHub-style repo header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-github-border">
          <div className="flex items-center">
            <img
              src="../assets/moss_transparent.png"
              alt="avatar"
              className="w-9 h-8 rounded-full"
            />
            <div className="flex items-center space-x-2 text-sm ml-1">
              <span className="text-github-textPrimary font-semibold">
                MOSS
              </span>
              <span className="text-github-textMuted">
                Feat: Create Tech Week
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-github-textMuted">
            <span>April 3rd</span>
            <span className="flex items-center space-x-1">
              <span className="font-semibold text-github-textPrimary">6</span>
              <span>Workshops</span>
            </span>
          </div>
        </div>

        {/* File explorer */}
        <div className="border border-github-border rounded-md overflow-hidden mb-8">
          <div className="flex items-center justify-between px-4 py-2 bg-github-bg hover:bg-github-border transition-colors border-t border-github-border">
            <div className="flex items-center space-x-3 text-sm">
              <svg
                className="w-4 h-4 text-github-textMuted"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4 0h5l5 5v9.25A1.75 1.75 0 0 1 12.25 16h-8.5A1.75 1.75 0 0 1 2 14.25v-12.5A1.75 1.75 0 0 1 3.75 0H4z" />
              </svg>

              {/* 👇 click scroll */}
              <span
                onClick={scrollToHeading}
                className="text-github-blue font-semibold cursor-pointer"
              >
                README.md
              </span>
            </div>

            <span className="text-xs text-github-textMuted">
              added 7 days of workshops
            </span>
          </div>
        </div>

        {/* Breadcrumb */}
        {/* 👇 attach ref here */}
        <div className="flex items-center space-x-2 mb-6 text-sm scroll-mt-32"  ref={headingRef} >
          <BookOpen className="w-4 h-4 text-github-textMuted" />
          <span className="text-github-textMuted">Open Source Week</span>
          <span className="text-github-textMuted">/</span>
          <span className="text-github-blue font-semibold">README.md</span>
        </div>

        {/* Main Content */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-github-green" />
            <span className="text-github-green font-semibold text-sm tracking-wide">
              CELESTIS OPEN SOURCE EVENT
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-github-textPrimary leading-tight">
            The Huanglong Journey
          </h1>

          <p className="text-lg md:text-xl text-github-textMuted mb-4 max-w-2xl leading-relaxed">
            A week-long open-source event designed to provide participants with
            hands-on experience across multiple technical domains, through a{" "}
            <span className="text-github-blue font-semibold">
              mythology-inspired progression system
            </span>
            .
          </p>

          <p className="text-base text-github-textMuted max-w-2xl leading-relaxed mb-8">
            Grow from beginners to skilled contributors and become the{" "}
            <span className="text-github-blue font-semibold">
              Huanglong Warrior
            </span>{" "}
            — Master of All Domains.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/domains")}
              className="btn-primary inline-flex items-center justify-center"
            >
              Explore Domains
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
            <button
              onClick={() => navigate("/events")}
              className="btn-secondary inline-flex items-center justify-center"
            >
              My Events
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-6 pt-8 border-t border-github-border">
          <div className="flex items-center space-x-3">
            <Star className="w-5 h-5 text-github-green" />
            <div>
              <div className="text-2xl font-bold text-github-textPrimary">
                9k
              </div>
              <div className="text-xs text-github-textMuted">Stars</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <GitFork className="w-5 h-5 text-github-blue" />
            <div>
              <div className="text-2xl font-bold text-github-textPrimary">
                1.2k
              </div>
              <div className="text-xs text-github-textMuted">Forks</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Activity className="w-5 h-5 text-github-textMuted" />
            <div>
              <div className="text-2xl font-bold text-github-textPrimary">
                4
              </div>
              <div className="text-xs text-github-textMuted">Domains</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
