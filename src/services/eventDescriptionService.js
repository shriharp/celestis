import { DOMAIN_EVENTS, getClubsByNames } from "./domainEvents";

/**
 * Fetch event details by domainId and eventId
 * @param {string} domainId - The domain ID
 * @param {string} eventId - The event ID
 * @returns {Promise<Object>} - Event data with additional details
 */
export async function getEventById(domainId, eventId) {
  try {
    // Get events from the domain
    const events = DOMAIN_EVENTS[domainId];

    if (!events) {
      throw new Error("Domain not found");
    }

    const event = events.find((e) => e.id === eventId);

    if (!event) {
      throw new Error("Event not found");
    }

    // Enhance event with additional data (speakers, clubs, outcomes, etc.)
    const enrichedEvent = {
      ...event,
      fullDescription:
        event.fullDescription ||
        `${event.description}\n\nThis is a comprehensive workshop designed to help you master ${event.tags[0]}. 
        Join our expert instructors as we dive deep into the fundamentals and advanced concepts.`,

      learningOutcomes: event.learningOutcomes || [
        `Master the core concepts of ${event.tags[0]}`,
        "Build real-world projects from scratch",
        "Understand best practices and industry standards",
        "Get hands-on experience with live coding",
        "Learn how to debug and optimize your code",
      ],

      prerequisites: event.prerequisites || [
        "Basic understanding of programming",
        "A laptop with code editor installed",
        "Enthusiasm to learn!",
      ],

      speakers:
        event.speakers ||
        (Array.isArray(event.instructor)
          ? event.instructor.map((instructor, idx) => ({
              id: `speaker-${idx + 1}`,
              name: instructor,
              role: "Workshop Instructor",
              image:
                "https://api.dicebear.com/7.x/avataaars/svg?seed=" + instructor,
            }))
          : [
              {
                id: "speaker-1",
                name: event.instructor,
                role: "Workshop Instructor",
                image:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
                  event.instructor,
              },
            ]),

      clubs:
        event.clubs && Array.isArray(event.clubs)
          ? getClubsByNames(event.clubs)
          : [
              {
                id: "club-1",
                name: "Open Source Club",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=club1",
              },
            ],

      duration: event.duration || "2-3 hours",
      type: event.type || "Workshop",
    };

    return enrichedEvent;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
}

/**
 * Update event data (registration count, etc.)
 * @param {string} eventId - The event ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<boolean>} - Success status
 */
export async function updateEventData(eventId, updateData) {
  try {
    // In a real application, this would make an API call to Supabase
    // For now, we'll just return success
    // TODO: Implement Supabase update when backend is ready

    console.log(`Updating event ${eventId} with data:`, updateData);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Return success
    return true;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
}

/**
 * Get all speakers for an event
 * @param {string} eventId - The event ID
 * @returns {Promise<Array>} - Array of speaker objects
 */
export async function getEventSpeakers(eventId) {
  try {
    // Search for event across all domains
    for (const domain in DOMAIN_EVENTS) {
      const events = DOMAIN_EVENTS[domain];
      const event = events.find((e) => e.id === eventId);
      if (event) {
        return event.speakers || [];
      }
    }
    throw new Error("Event not found");
  } catch (error) {
    console.error("Error fetching speakers:", error);
    throw error;
  }
}

/**
 * Get all participating clubs for an event
 * @param {string} eventId - The event ID
 * @returns {Promise<Array>} - Array of club objects
 */
export async function getEventClubs(eventId) {
  try {
    // Search for event across all domains
    for (const domain in DOMAIN_EVENTS) {
      const events = DOMAIN_EVENTS[domain];
      const event = events.find((e) => e.id === eventId);
      if (event) {
        return event.clubs || [];
      }
    }
    throw new Error("Event not found");
  } catch (error) {
    console.error("Error fetching clubs:", error);
    throw error;
  }
}

/**
 * Register user for an event
 * @param {string} eventId - The event ID
 * @param {string} userId - The user ID
 * @returns {Promise<boolean>} - Success status
 */
export async function registerForEvent(eventId, userId) {
  try {
    // TODO: Implement Supabase registration logic
    console.log(`User ${userId} registering for event ${eventId}`);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return true;
  } catch (error) {
    console.error("Error registering for event:", error);
    throw error;
  }
}

/**
 * Unregister user from an event
 * @param {string} eventId - The event ID
 * @param {string} userId - The user ID
 * @returns {Promise<boolean>} - Success status
 */
export async function unregisterFromEvent(eventId, userId) {
  try {
    // TODO: Implement Supabase unregistration logic
    console.log(`User ${userId} unregistering from event ${eventId}`);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return true;
  } catch (error) {
    console.error("Error unregistering from event:", error);
    throw error;
  }
}

/**
 * Save/bookmark an event for later
 * @param {string} eventId - The event ID
 * @param {string} userId - The user ID
 * @returns {Promise<boolean>} - Success status
 */
export async function saveEvent(eventId, userId) {
  try {
    // TODO: Implement Supabase save logic
    console.log(`User ${userId} saving event ${eventId}`);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return true;
  } catch (error) {
    console.error("Error saving event:", error);
    throw error;
  }
}

/**
 * Get user's saved events
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} - Array of saved event IDs
 */
export async function getUserSavedEvents(userId) {
  try {
    // TODO: Implement Supabase fetch logic
    console.log(`Fetching saved events for user ${userId}`);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return [];
  } catch (error) {
    console.error("Error fetching saved events:", error);
    throw error;
  }
}
