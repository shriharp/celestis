import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  User,
  Tag,
  ArrowLeft,
} from "lucide-react";
import { getDomainEvents } from "../services/domainEvents";
import { getDomains } from "../services/eventsService";

export default function DomainEvents() {
  const { domainId } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [domain, setDomain] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const domainData = await getDomains();
        const foundDomain = domainData.find((d) => d.id === domainId);
        setDomain(foundDomain);

        const eventsData = getDomainEvents(domainId);
        setEvents(eventsData);
      } catch (error) {
        console.error("Error loading domain events:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [domainId]);

  const handleRegister = (eventId) => {
    // TODO: Implement registration logic
    alert(`Registering for event: ${eventId}`);
  };

  const handleMoreInfo = (eventId) => {
    navigate(`/domains/${domainId}/events/${eventId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex justify-center items-center">
        <div className="text-github-textMuted animate-pulse">
          Loading events...
        </div>
      </div>
    );
  }

  if (!domain) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex justify-center items-center">
        <div className="text-github-textMuted">Domain not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-2 pb-12 bg-github-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/domains")}
            className="flex items-center text-github-blue hover:text-github-blueHover mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Domains
          </button>

          <div className="flex items-center mb-4">
            <h1 className="text-3xl font-bold text-github-textPrimary mr-4">
              {domain.name}
            </h1>
            <div className="flex items-center text-sm text-github-textMuted">
              <span
                className={`w-3 h-3 rounded-full bg-${domain.color} mr-2`}
              />
              {domain.symbol}
            </div>
          </div>

          <p className="text-github-textMuted">
            Explore workshops and events in the {domain.name} domain
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-github-canvas border border-github-border rounded-lg overflow-hidden hover:border-github-borderHover transition-all duration-300 hover:shadow-lg"
            >
              {/* Event Image */}
              {event.image && (
                <div className="w-full h-48 overflow-hidden bg-github-bg">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Event Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-github-textPrimary mb-3 line-clamp-2">
                  {event.title}
                </h3>

                <p className="text-github-textMuted text-sm mb-4 line-clamp-3">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-github-textMuted">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>

                  <div className="flex items-center text-sm text-github-textMuted">
                    <Clock className="w-4 h-4 mr-2" />
                    {event.time}
                  </div>

                  <div className="flex items-center text-sm text-github-textMuted">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>

                  <div className="flex items-center text-sm text-github-textMuted">
                    <User className="w-4 h-4 mr-2" />
                    {event.instructor}
                  </div>

                  <div className="flex items-center text-sm text-github-textMuted">
                    <Users className="w-4 h-4 mr-2" />
                    {event.registered}/{event.capacity} registered
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-github-bg border border-github-border text-github-textMuted"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleRegister(event.id)}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    Register
                  </button>

                  <button
                    onClick={() => handleMoreInfo(event.id)}
                    className="flex-1 border border-github-border text-github-textPrimary px-4 py-2 rounded-md text-sm font-medium hover:bg-github-canvasHover transition-colors"
                  >
                    More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-github-textMuted">
              No events available for this domain yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
