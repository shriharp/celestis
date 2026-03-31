# Event Description Feature Guide

## Overview

This feature provides a detailed event description page with GitHub-style sidebar for speakers and clubs. When users click "More" on an event card, they're taken to the event details page.

## File Structure

```
src/
├── components/
│   ├── EventDescription.jsx          # Main event details page
│   ├── DomainEvents.jsx              # Updated with navigation
│   └── SidebarSections/
│       ├── SpeakersSection.jsx       # Speaker list component
│       └── ClubsSection.jsx          # Club list component
├── services/
│   ├── eventDescriptionService.js    # Data management & API calls
│   └── domainEvents.js               # Event data (source of truth)
└── App.jsx                            # Updated with new route
```

## Features

### Left Section (Main Content)

- **Hero Image** - Event banner image
- **Title & Meta Info** - Event title, instructor, registration status, difficulty
- **Action Buttons** - Register, Save, Share, Like
- **Event Details** - Date, time, location, capacity
- **Description** - Full event description
- **Learning Outcomes** - What attendees will learn
- **Prerequisites** - Requirements to attend
- **Technologies/Tags** - Skills and tools covered

### Right Sidebar

- **Speakers Section** - Event instructors/speakers with:
  - Profile avatar
  - Name and role
  - Bio
  - Email & website links
- **Clubs Section** - Participating organizations with:
  - Club avatar
  - Name
  - Member count
  - Bio

- **Capacity Status** - Visual progress bar of registration
- **Quick Info** - Difficulty level, duration, event type

## How to Use

### Basic Usage

1. **Click "More" on Event Card**
   - From `DomainEvents` page, clicking the "More" button navigates to:
   - `/domains/{domainId}/events/{eventId}`

2. **Event Data is Auto-Enriched**
   - The service fetches base event data from `domainEvents.js`
   - Automatically generates speakers, clubs, outcomes, and prerequisites
   - You can override these by adding fields directly to events

### Customizing Event Data

To customize event details, add these optional fields to your event object in `domainEvents.js`:

```javascript
{
  id: "event-id",
  title: "Event Title",
  description: "Short description",
  // ... existing fields ...

  // Optional enriched fields
  fullDescription: "Detailed long description",
  learningOutcomes: [
    "Outcome 1",
    "Outcome 2",
  ],
  prerequisites: [
    "Requirement 1",
    "Requirement 2",
  ],
  speakers: [
    {
      id: "speaker-1",
      name: "John Doe",
      role: "Lead Instructor",
      image: "https://...",
      bio: "Speaker bio",
      email: "john@example.com",
      website: "https://johndoe.com",
      profileUrl: "/profile/john-doe"
    }
  ],
  clubs: [
    {
      id: "club-1",
      name: "Code Club",
      image: "https://...",
      members: 150,
      bio: "Club description",
      profileUrl: "/clubs/code-club"
    }
  ],
  duration: "2-3 hours",
  type: "Workshop"
}
```

## Service Functions

### `eventDescriptionService.js`

#### Get Event Details

```javascript
const event = await getEventById(domainId, eventId);
```

#### Update Event Data

```javascript
await updateEventData(eventId, {
  registered: newCount,
  // other fields...
});
```

#### Register for Event

```javascript
await registerForEvent(eventId, userId);
```

#### Unregister from Event

```javascript
await unregisterFromEvent(eventId, userId);
```

#### Save/Bookmark Event

```javascript
await saveEvent(eventId, userId);
```

#### Get User's Saved Events

```javascript
const savedEvents = await getUserSavedEvents(userId);
```

#### Get Speakers

```javascript
const speakers = await getEventSpeakers(eventId);
```

#### Get Clubs

```javascript
const clubs = await getEventClubs(eventId);
```

## Integration with Supabase

The service functions are ready for Supabase integration. To implement real data persistence:

### 1. Update `updateEventData()`

```javascript
export async function updateEventData(eventId, updateData) {
  const { data, error } = await supabase
    .from("events")
    .update(updateData)
    .eq("id", eventId);

  if (error) throw error;
  return !!data;
}
```

### 2. Update `registerForEvent()`

```javascript
export async function registerForEvent(eventId, userId) {
  const { data, error } = await supabase
    .from("registrations")
    .insert([{ event_id: eventId, user_id: userId }]);

  if (error) throw error;
  return !!data;
}
```

### 3. Similar patterns for other functions

Apply the same pattern to other service functions using your Supabase schema.

## Styling

All components use the GitHub-inspired Tailwind color scheme:

- `bg-github-bg` - Dark background
- `bg-github-canvas` - Card background
- `text-github-textPrimary` - Main text
- `text-github-textMuted` - Secondary text
- `border-github-border` - Borders
- `bg-github-blue` - Primary action button

## Responsive Design

- **Desktop (lg+)** - 2-column layout (content + sidebar)
- **Tablet (md)** - Adapts grid layout
- **Mobile** - Single column (sidebar moves to bottom)

## Features to Implement

- [ ] User authentication check for registration
- [ ] Save events to user profile
- [ ] Share event on social media
- [ ] Like/favorite events
- [ ] Event reviews and ratings
- [ ] Related events suggestions
- [ ] Event calendar integration
- [ ] Email notifications for event updates
- [ ] Capacity limit enforcement
- [ ] Waitlist functionality
- [ ] Event cancellation/rescheduling

## Testing the Feature

1. Navigate to `/domains/{domainId}`
2. Find any event card
3. Click the "More" button
4. You should see the full event details page
5. Try:
   - Scrolling through the content
   - Clicking Register button (will update local state)
   - Clicking Save button (toggles save state)
   - Viewing speakers and clubs sections

## Notes

- Currently uses mock data generation for speakers/clubs
- Service functions are async and ready for API integration
- Image URLs use Dicebear API as placeholder for avatars
- All functions have TODO comments for Supabase implementation
- Error handling is implemented but logs to console
