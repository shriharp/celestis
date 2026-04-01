import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DomainsList from "./components/DomainsList";
import DomainEvents from "./components/DomainEvents";
import EventDescription from "./components/EventDescription";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Register from "./components/Register";
import MyEvents from "./components/MyEvents";
import AdminDashboard from "./components/AdminDashboard";

const Home = () => (
  <main className="min-h-screen pb-12 flex flex-col items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <Hero />
  </main>
);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="relative w-full min-h-screen bg-github-bg text-github-textPrimary transition-colors duration-300">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/domains" element={<DomainsList />} />
            <Route path="/domains/:domainId" element={<DomainEvents />} />
            <Route
              path="/domains/:domainId/events/:eventId"
              element={<EventDescription />}
            />
            <Route path="/events" element={<MyEvents></MyEvents>} />
            <Route
              path="/profile"
              element={<MyEvents></MyEvents>}
            />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
