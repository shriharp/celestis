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
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { getEventById } from "../services/eventDescriptionService";
import SpeakersSection from "./SidebarSections/SpeakersSection";
import ClubsSection from "./SidebarSections/ClubsSection";

export default function EventDescription() {
  const { domainId, eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationCount, setRegistrationCount] = useState(0);

  // 🔥 Get total registrations
  const getRegistrationCount = async (eventId) => {
    const { count, error } = await supabase
      .from("registrations")
      .select("*", { count: "exact", head: true })
      .eq("workshop_id", eventId);

    if (error) {
      console.error(error);
      return 0;
    }

    return count || 0;
  };
  const regId = domainId + "." + eventId;
  // 🔥 Check if user registered
  const checkRegistration = async (userId) => {
    const { data } = await supabase
      .from("registrations")
      .select("id")
      .eq("user_id", userId)
      .eq("workshop_id", regId)
      .maybeSingle();

    return !!data;
  };

  useEffect(() => {
    async function loadEvent() {
      try {
        const eventData = await getEventById(domainId, eventId);
        setEvent(eventData);

        // 🔥 get count
        const count = await getRegistrationCount(regId);
        setRegistrationCount(count);

        // 🔥 check user
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const registered = await checkRegistration(user.id);
          setIsRegistered(registered);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadEvent();
  }, [domainId, eventId]);

  // 🔥 Register / Unregister
  const handleRegister = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }
      const regId = domainId + "." + eventId;
      if (isRegistered) {
        // ❌ UNREGISTER
        await supabase
          .from("registrations")
          .delete()
          .eq("user_id", user.id)
          .eq("workshop_id", regId);

        setIsRegistered(false);
        setRegistrationCount((prev) => prev - 1);
      } else {
        // ✅ REGISTER
        const { error } = await supabase.from("registrations").insert([
          {
            user_id: user.id,
            workshop_id: regId,
          },
        ]);

        if (error) throw error;

        setIsRegistered(true);
        setRegistrationCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Registration error:", error);

      // handle duplicate safely
      if (error.message?.includes("duplicate")) {
        setIsRegistered(true);
      }
    }
  };

  // ---------------- UI ----------------

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex justify-center items-center">
        <div className="animate-pulse">Loading event...</div>
      </div>
    );
  }

  if (!event) {
    return <div className="text-center pt-24">Event not found</div>;
  }

  return (
    <div className="min-h-screen pt-4 pb-12 bg-github-bg text-github-textPrimary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <button
          onClick={() => navigate(`/domains/${domainId}`)}
          className="flex items-center mb-6 text-github-blue hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Domain
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2">
            {/* Hero */}
            {event.image && (
              <div className="border border-github-border rounded-lg overflow-hidden mb-6">
                <img src={event.image} className="w-full h-80 object-cover" />
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl font-bold mb-2">{event.title}</h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-github-textMuted border-b border-github-border pb-4 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {event.instructor}
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {registrationCount} participants
              </div>

              <span className="px-2 py-0.5 text-xs border border-github-border rounded-full">
                {event.type || "Workshop"}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleRegister}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  isRegistered
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : registrationCount >= event.capacity
                      ? "bg-github-bg border border-github-border text-github-textMuted cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {isRegistered
                  ? "Unregister"
                  : registrationCount >= event.capacity
                    ? "Event Full"
                    : "Register"}
              </button>

              <button className="px-4 py-2 border border-github-border rounded-md text-sm flex items-center gap-2 hover:bg-github-canvasHover">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            {/* 📦 DETAILS CARD */}
            <div className="bg-github-canvas border border-github-border rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Event Details</h2>

              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-github-textMuted mb-1">Date</p>
                  <p>{new Date(event.date).toDateString()}</p>
                </div>

                <div>
                  <p className="text-github-textMuted mb-1">Time</p>
                  <p>{event.time}</p>
                </div>

                <div>
                  <p className="text-github-textMuted mb-1">Location</p>
                  <p>{event.location}</p>
                </div>

                <div>
                  <p className="text-github-textMuted mb-1">Partipants</p>
                  <p>{registrationCount} participants</p>
                </div>
              </div>
            </div>

            {/* 📄 DESCRIPTION */}
            <div className="bg-github-canvas border border-github-border rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">About This Event</h2>

              <p className="text-github-textMuted leading-relaxed">
                {event.fullDescription || event.description}
              </p>
            </div>

            {/* 🏷 TAGS */}
            {event.tags?.length > 0 && (
              <div className="bg-github-canvas border border-github-border rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Technologies & Skills
                </h2>

                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs border border-github-border rounded-full bg-github-bg hover:border-github-blue transition"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            {/* Speakers */}
            <div className="bg-github-canvas border border-github-border rounded-lg p-4">
              <SpeakersSection speakers={event.speakers} />
            </div>

            {/* Clubs */}
            <div className="bg-github-canvas border border-github-border rounded-lg p-4">
              <ClubsSection clubs={event.clubs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
