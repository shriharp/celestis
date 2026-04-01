import { Users } from "lucide-react";

export default function ClubsSection({ clubs = [] }) {
  if (!clubs || clubs.length === 0) {
    return null;
  }

  return (
    <div className="bg-github-canvas border border-github-border rounded-lg p-6">
      <h3 className="text-sm font-semibold text-github-textPrimary mb-4 uppercase tracking-wide">
        Participating Clubs
      </h3>

      <div className="space-y-4">
        {clubs.map((club, idx) => (
          <div
            key={club.id || idx}
            className="flex items-start space-x-3 pb-4 border-b border-github-border last:border-b-0 last:pb-0"
          >
            {/* Club Avatar */}
            <div className="flex-shrink-0">
              <img
                src={club.image}
                alt={club.name}
                className="w-12 h-12 rounded-full border border-github-border object-cover"
              />
            </div>

            {/* Club Info */}
            <div className="flex-grow min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <a
                    href={club.profileUrl || "#"}
                    className="text-sm font-semibold text-github-blue hover:text-github-blueHover transition-colors"
                  >
                    {club.name}
                  </a>
                </div>
              </div>

              {/* Club Bio */}
              {club.bio && (
                <p className="text-xs text-github-textMuted mt-2 line-clamp-2">
                  {club.bio}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
