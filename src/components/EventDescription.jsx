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
  Share2,
  BookmarkPlus,
  Heart,
} from "lucide-react";
import {
  getEventById,
  updateEventData,
} from "../services/eventDescriptionService";
import SpeakersSection from "./SidebarSections/SpeakersSection";
import ClubsSection from "./SidebarSections/ClubsSection";

export default function EventDescription() {
  const { domainId, eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    async function loadEvent() {
      try {
        const eventData = await getEventById(domainId, eventId);
        setEvent(eventData);
        // TODO: Check if user is registered
        setIsRegistered(false);
      } catch (error) {
        console.error("Error loading event:", error);
      } finally {
        setLoading(false);
      }
    }
    loadEvent();
  }, [domainId, eventId]);

  const handleRegister = async () => {
    try {
      const updated = await updateEventData(eventId, {
        registered: event.registered + 1,
      });
      if (updated) {
        setEvent((prev) => ({
          ...prev,
          registered: prev.registered + 1,
        }));
        setIsRegistered(true);
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // TODO: Implement save to user's list
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex justify-center items-center">
        <div className="text-github-textMuted animate-pulse">
          Loading event details...
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex justify-center items-center">
        <div className="text-github-textMuted">Event not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-4 pb-12 bg-github-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(`/domains/${domainId}`)}
            className="flex items-center text-github-blue hover:text-github-blueHover mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Domain
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            {event.image && (
              <div className="w-full h-96 rounded-lg overflow-hidden mb-8 bg-github-bg border border-github-border">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Event Title and Meta */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-github-textPrimary mb-4">
                {event.title}
              </h1>

              <div className="flex flex-wrap gap-4 items-center mb-6 text-sm text-github-textMuted border-b border-github-border pb-6">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {event.instructor}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  {event.registered} of {event.capacity} registered
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.difficulty === "Beginner"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : event.difficulty === "Intermediate"
                        ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                >
                  {event.difficulty}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-8">
                <button
                  onClick={handleRegister}
                  disabled={isRegistered || event.registered >= event.capacity}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isRegistered || event.registered >= event.capacity
                      ? "bg-github-bg border border-github-border text-github-textMuted cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {isRegistered
                    ? "Already Registered"
                    : event.registered >= event.capacity
                      ? "Event Full"
                      : "Register Now"}
                </button>

                <button className="px-4 py-2 border border-github-border text-github-textPrimary rounded-md text-sm font-medium hover:bg-github-canvasHover transition-colors flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>

            {/* Event Details Grid */}
            <div className="bg-github-canvas border border-github-border rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-github-textPrimary mb-6">
                Event Details
              </h2>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center text-github-textMuted mb-2">
                    <Calendar className="w-5 h-5 mr-3 text-github-blue" />
                    <span className="text-sm">Date</span>
                  </div>
                  <p className="text-github-textPrimary font-medium pl-8">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div>
                  <div className="flex items-center text-github-textMuted mb-2">
                    <Clock className="w-5 h-5 mr-3 text-github-blue" />
                    <span className="text-sm">Time</span>
                  </div>
                  <p className="text-github-textPrimary font-medium pl-8">
                    {event.time}
                  </p>
                </div>

                <div>
                  <div className="flex items-center text-github-textMuted mb-2">
                    <MapPin className="w-5 h-5 mr-3 text-github-blue" />
                    <span className="text-sm">Location</span>
                  </div>
                  <p className="text-github-textPrimary font-medium pl-8">
                    {event.location}
                  </p>
                </div>

                <div>
                  <div className="flex items-center text-github-textMuted mb-2">
                    <Users className="w-5 h-5 mr-3 text-github-blue" />
                    <span className="text-sm">Capacity</span>
                  </div>
                  <p className="text-github-textPrimary font-medium pl-8">
                    {event.capacity} participants
                  </p>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-github-textPrimary mb-4">
                About This Event
              </h2>
              <p className="text-github-textMuted leading-relaxed mb-4">
                {event.fullDescription || event.description}
              </p>

              {event.learningOutcomes && (
                <div className="bg-github-canvas border border-github-border rounded-lg p-6 mt-6">
                  <h3 className="text-lg font-semibold text-github-textPrimary mb-4">
                    What You'll Learn
                  </h3>
                  <ul className="space-y-2">
                    {event.learningOutcomes.map((outcome, idx) => (
                      <li
                        key={idx}
                        className="flex items-start text-github-textMuted"
                      >
                        <span className="text-github-blue mr-3 mt-1">✓</span>
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {event.prerequisites && (
                <div className="bg-github-canvas border border-github-border rounded-lg p-6 mt-6">
                  <h3 className="text-lg font-semibold text-github-textPrimary mb-4">
                    Prerequisites
                  </h3>
                  <ul className="space-y-2">
                    {event.prerequisites.map((prerequisite, idx) => (
                      <li
                        key={idx}
                        className="text-github-textMuted flex items-start"
                      >
                        <span className="text-github-blue mr-3">•</span>
                        {prerequisite}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-github-textPrimary mb-4">
                  Technologies & Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-github-bg border border-github-border text-github-textMuted hover:border-github-blue transition-colors cursor-pointer"
                    >
                      <Tag className="w-3 h-3 mr-2" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Speakers Section */}
              <SpeakersSection speakers={event.speakers} />

              {/* Clubs Section */}
              <ClubsSection clubs={event.clubs} />

              {/* Capacity Status */}
              <div className="bg-github-canvas border border-github-border rounded-lg p-6">
                <h3 className="text-sm font-semibold text-github-textPrimary mb-4 uppercase tracking-wide">
                  Capacity Status
                </h3>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-github-textMuted">Registered</span>
                    <span className="text-github-textPrimary font-medium">
                      {event.registered}
                    </span>
                  </div>
                  <div className="w-full bg-github-bg rounded-full h-2 border border-github-border overflow-hidden">
                    <div
                      className="bg-github-blue h-full transition-all duration-300"
                      style={{
                        width: `${(event.registered / event.capacity) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-xs text-github-textMuted">
                    <span>{event.capacity - event.registered} spots left</span>
                    <span>{event.capacity} total</span>
                  </div>
                </div>
              </div>

              {/* Quick Info Card */}
              <div className="bg-github-canvas border border-github-border rounded-lg p-6 sticky top-28">
                <h3 className="text-sm font-semibold text-github-textPrimary mb-4 uppercase tracking-wide">
                  Quick Info
                </h3>

                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-github-textMuted text-xs uppercase tracking-wide mb-1">
                      Difficulty Level
                    </p>
                    <p className="text-github-textPrimary font-medium">
                      {event.difficulty}
                    </p>
                  </div>

                  <div>
                    <p className="text-github-textMuted text-xs uppercase tracking-wide mb-1">
                      Duration
                    </p>
                    <p className="text-github-textPrimary font-medium">
                      {event.duration || "2-3 hours"}
                    </p>
                  </div>

                  <div>
                    <p className="text-github-textMuted text-xs uppercase tracking-wide mb-1">
                      Event Type
                    </p>
                    <p className="text-github-textPrimary font-medium">
                      {event.type || "Workshop"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
