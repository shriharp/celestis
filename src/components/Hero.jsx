import {
  BookOpen,
  Star,
  GitFork,
  Activity,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-github-bg">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-6 text-sm">
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
