import { Mail, Globe } from "lucide-react";

export default function SpeakersSection({ speakers = [] }) {
  if (!speakers || speakers.length === 0) {
    return null;
  }

  return (
    <div className="bg-github-canvas border border-github-border rounded-lg p-6">
      <h3 className="text-sm font-semibold text-github-textPrimary mb-4 uppercase tracking-wide">
        Speakers & Instructors
      </h3>

      <div className="space-y-4">
        {speakers.map((speaker, idx) => (
          <div
            key={speaker.id || idx}
            className="flex items-start space-x-3 pb-4 border-b border-github-border last:border-b-0 last:pb-0"
          >
            {/* Speaker Avatar */}
            <div className="flex-shrink-0">
              <img
                src={speaker.image}
                alt={speaker.name}
                className="w-12 h-12 rounded-full border border-github-border"
              />
            </div>

            {/* Speaker Info */}
            <div className="flex-grow min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <a
                    href={speaker.profileUrl || "#"}
                    className="text-sm font-semibold text-github-blue hover:text-github-blueHover transition-colors"
                  >
                    {speaker.name}
                  </a>
                  <p className="text-xs text-github-textMuted mt-1">
                    {speaker.role}
                  </p>
                </div>
              </div>

              {/* Speaker Bio */}
              {speaker.bio && (
                <p className="text-xs text-github-textMuted mt-2 line-clamp-2">
                  {speaker.bio}
                </p>
              )}

              {/* Speaker Links */}
              <div className="flex gap-2 mt-2">
                {speaker.email && (
                  <a
                    href={`mailto:${speaker.email}`}
                    className="inline-flex items-center justify-center w-6 h-6 rounded border border-github-border text-github-textMuted hover:text-github-blue hover:border-github-blue transition-colors"
                    title="Email"
                  >
                    <Mail className="w-3 h-3" />
                  </a>
                )}
                {speaker.website && (
                  <a
                    href={speaker.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-6 h-6 rounded border border-github-border text-github-textMuted hover:text-github-blue hover:border-github-blue transition-colors"
                    title="Website"
                  >
                    <Globe className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <a
        href="#"
        className="inline-block mt-4 text-sm text-github-blue hover:text-github-blueHover transition-colors"
      >
        View all speakers →
      </a>
    </div>
  );
}
