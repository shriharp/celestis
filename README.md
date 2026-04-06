# Celestis - MOSS's Open Source Week

Welcome to the Celestis code repository! This project serves as the dedicated platform for the **official open source week organised by the manipal open source society** (MOSS).

It is a comprehensive event registration and management platform designed to help students discover, register for, and track open-source workshops and activities throughout the week.

![Celestis Platform](https://via.placeholder.com/1200x600?text=Celestis+Platform)

## Key Features

* **Event Registrations:** Browse all available events seamlessly. View detailed event information including schedules, descriptions, speakers, and prerequisites, and sign up with a single click.
* **Role-Based Access Control:** Secure boundaries between standard participants and system administrators.
  * **Participants:** Can view schedules, manage profile, save favorite events, and securely register.
  * **Admins:** Have access to the **Admin Dashboard** allowing them to monitor registration metrics.
* **Real-time Updates & Persistence:** Built on top of a resilient backend letting users seamlessly check back on their registered history.

## Live Demo

You can explore and use the live application here:
[**Launch Celestis Platform (Vercel)**](https://celestis.vercel.app/) *(Insert the actual URL here if different)*

## General User Walkthrough

1. **Onboarding:** When you arrive, you will see a landing page outlining the open source week's themes. If you're a new user or a returning attendee, you can authenticate via the `Login / Sign Up` pages. 
2. **Browsing Events:** The main dashboard or the `Domains/Events` section neatly grids out different activities. Each event card highlights basic info.
3. **Event Details:** Clicking **"More"** opens a dedicated view with comprehensive specifics on the event, sidebars for clubs and speakers involved, and its current capacity.
4. **Registration:** In the Event Details page, click "Register". Your action updates the event count and adds the event to your personal registered list.
5. **Dashboard:** You can review all your registered and saved/bookmarked events in one centralized location.
6. **(For Organizers) Admin Panel:** Verified admins can navigate to the `/admin` dashboard to visualize application-wide metrics and user signups.

## Technical Description

This platform is a modern, responsive web application orchestrated with the following technologies:

* **Frontend Framework:** Built heavily with [React 18](https://react.dev/) using JSX components.
* **Build Tool:** Bootstrapped via [Vite](https://vitejs.dev/) for blazing-fast HMR and optimized production bundles.
* **Styling:** Styled primarily with [Tailwind CSS](https://tailwindcss.com/) for rapid utility-first UI development, complemented by a GitHub-inspired custom theme (`index.css` & Tailwind config) supporting dark mode aesthetics. Uses `clsx` and `tailwind-merge` for conditional class handling.
* **Routing:** Managed via `react-router-dom` to provide a snappy, single-page application (SPA) experience across events, domains, login, and the dashboard.
* **Backend Integration / Database:** Setup includes SDKs for [Supabase](https://supabase.com/) (`@supabase/supabase-js`) ensuring robust Postgres database interactions, structured user authentication flows (`authService.js`), and handling the relationships between events, user registrations, and metadata (`eventsService.js`).
* **Animations & Icons:** Incorporates `framer-motion` for fluid UX micro-interactions and `lucide-react` for crisp SVG icons.

The application component hierarchy separates views (like `Login.jsx`, `AdminDashboard.jsx`, `Navbar.jsx`) from domain logic/services (making it easy to swap backend adapters). 

## Clone and Use Guide

To get a local instance of Celestis running on your machine for development or testing, follow these steps:

### Prerequisites
* Node.js (v16.14 or newer recommended)
* npm (comes with Node) or yarn
* A Supabase project (for environment variables if testing database features)

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/celestis.git
# Or whatever the repository URL is
cd celestis
```

### 2. Install Dependencies

Install all the necessary npm packages for the project.

```bash
npm install
```

### 3. Setup Environment Variables

Copy the example environment file or create a new `.env` file at the root of your project:

```bash
touch .env
```
Inside `.env`, populate your required Supabase tokens:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the Development Server

Start the Vite development server.

```bash
npm run dev
```

The app will typically be available at `http://localhost:5173`. Any changes to the code will hot-reload in the browser.

### 5. Building for Production

If you wish to create a production-optimized build (dist/ folder):

```bash
npm run build
```
You can preview the production build locally:
```bash
npm run preview
```

---
*Developed by the Manipal Open Source Society.*
