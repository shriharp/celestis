import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { getEventById } from "../services/eventDescriptionService";
import { Calendar, ArrowRight } from "lucide-react";

export default function MyEvents() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMyEvents() {
      try {
        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          navigate("/login");
          return;
        }

        // Get registrations
        const { data: registrations, error } = await supabase
          .from("registrations")
          .select("workshop_id")
          .eq("user_id", user.id);

        if (error) throw error;

        // Fetch event details + attach ids
        const eventsData = await Promise.all(
          registrations.map(async (reg) => {
            console.log(reg);
            const [domainId, workshopId] = reg.workshop_id.split(".");

            try {
              const event = await getEventById(domainId, workshopId);

              return {
                ...event,
                domainId,
                workshopId,
              };
            } catch (err) {
              console.error("Failed to load event:", err);
              return null;
            }
          })
        );

        setEvents(eventsData.filter(Boolean));
      } catch (err) {
        console.error("Error loading events:", err);
      } finally {
        setLoading(false);
      }
    }

    loadMyEvents();
  }, [navigate]);

  // ---------------- UI ----------------

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex justify-center items-center">
        <div className="text-github-textMuted animate-pulse">
          Loading your events...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-4 pb-12 bg-github-bg text-github-textPrimary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-8 border-b border-github-border pb-4">
          <h1 className="text-2xl font-bold">My Events</h1>
          <p className="text-sm text-github-textMuted mt-1">
            Events you’ve registered for
          </p>
        </div>

        {/* Empty State */}
        {events.length === 0 && (
          <div className="text-center py-20 border border-github-border rounded-lg bg-github-canvas">
            <p className="text-github-textMuted mb-4">
              You haven’t registered for any events yet.
            </p>
            <button
              onClick={() => navigate("/domains")}
              className="px-4 py-2 bg-github-blue text-white rounded-md text-sm"
            >
              Explore Events
            </button>
          </div>
        )}

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={`${event.domainId}-${event.workshopId}`}
              onClick={() =>
                navigate(`/domains/${event.domainId}/events/${event.workshopId}`)
              }
              className="cursor-pointer bg-github-canvas border border-github-border rounded-lg overflow-hidden hover:border-github-blue transition"
            >
              {/* Image */}
              {event.image && (
                <div className="h-40 overflow-hidden">
                  <img
                    src={event.image}
                    className="w-full h-full object-cover"
                    alt={event.title}
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-github-textPrimary mb-2 line-clamp-1">
                  {event.title}
                </h3>

                <p className="text-sm text-github-textMuted mb-3 line-clamp-2">
                  {event.description}
                </p>

                {/* Meta */}
                <div className="flex justify-between text-xs text-github-textMuted">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {event.date
                      ? new Date(event.date).toLocaleDateString()
                      : "No date"}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-4 flex justify-end">
                  <span className="text-xs text-github-blue flex items-center gap-1">
                    View
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}