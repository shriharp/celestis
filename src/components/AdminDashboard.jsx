import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { getEventById } from "../services/eventDescriptionService";
import { registerUser } from "../services/authService";
import { Trash2, UserPlus, Loader, AlertTriangle, X } from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [usersInfo, setUsersInfo] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  
  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    learneremail: "",
    registrationNumber: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    async function initAdmin() {
      const { data: { user }, error: authErr } = await supabase.auth.getUser();
      
      if (authErr || !user) {
        console.warn("Admin check failed or no user found", authErr);
        navigate("/");
        return;
      }

      if (user.email !== "admin@celestis.com") {
        console.warn("User is not admin. Email is: ", user.email);
        alert(`Access Denied! Your email is ${user.email}, expected admin@celestis.com`);
        navigate("/");
        return;
      }

      await loadDashboardData();
    }
    
    initAdmin();
  }, [navigate]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // 1. Fetch profiles
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (profilesError) throw profilesError;

      // 2. Fetch registrations
      const { data: regs, error: regsError } = await supabase
        .from("registrations")
        .select("*");
        
      if (regsError) throw regsError;

      // 3. Map registrations to user and get event details
      const userMap = {};
      const workshopCounts = {};
      
      for (const p of profiles) {
        userMap[p.id] = { ...p, enrolledEvents: [] };
      }

      for (const reg of regs) {
        if (!userMap[reg.user_id] || !reg.workshop_id) continue;

        let eventTitle = reg.workshop_id;
        try {
          const [domainId, workshopId] = String(reg.workshop_id).split(".");
          const event = await getEventById(domainId, workshopId);
          eventTitle = event.title;
        } catch (e) {
          eventTitle = reg.workshop_id || "Unknown";
        }
        
        userMap[reg.user_id].enrolledEvents.push(eventTitle);
        workshopCounts[eventTitle] = (workshopCounts[eventTitle] || 0) + 1;
      }

      setUsersInfo(Object.values(userMap));
      setDashboardStats({
        totalUsers: profiles.length,
        totalRegistrations: regs.length,
        workshopCounts
      });
    } catch (err) {
      console.error("Failed to load admin data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user? This removes their profile and registrations.")) return;

    try {
      // Delete registrations first (if no cascade)
      await supabase.from("registrations").delete().eq("user_id", userId);
      
      // Delete profile
      const { error } = await supabase.from("profiles").delete().eq("id", userId);
      
      if (error) throw error;
      
      // Update UI
      setUsersInfo(prev => prev.filter(u => u.id !== userId));
      loadDashboardData(); // Refresh stats and users in the background
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user. Make sure RLS is disabled or allows deletes.");
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    setAddError("");

    if (!formData.name || !formData.email || !formData.learneremail || !formData.registrationNumber || !formData.password) {
      setAddError("Please fill in all fields.");
      setIsAdding(false);
      return;
    }

    const res = await registerUser(formData);
    
    if (res.success) {
      // NOTE: Because of how Supabase auth works, signing up a new user logs the current user out. 
      // The admin will be redirected because they are no longer admin. 
      alert("User added! You will now be signed in as the new user and redirected. Please sign back into your admin account.");
      setShowAddModal(false);
      // Wait for AuthStateChange to redirect us
    } else {
      setAddError(res.error || "Failed to add user.");
      setIsAdding(false);
    }
  };

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-github-textMuted" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8 pb-12 bg-github-bg text-github-textPrimary px-4 sm:px-6">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-github-border pb-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-github-textMuted mt-1">Manage users and view workshop enrollments.</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </button>
        </div>

        {/* Statistics Cards */}
        {dashboardStats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-github-canvas border border-github-border rounded-lg p-6 flex flex-col justify-center shadow-sm">
              <span className="text-github-textMuted text-sm font-semibold uppercase tracking-wider mb-2">Total Users</span>
              <span className="text-4xl font-bold text-github-blue">{dashboardStats.totalUsers}</span>
            </div>
            
            <div className="bg-github-canvas border border-github-border rounded-lg p-6 flex flex-col justify-center shadow-sm">
              <span className="text-github-textMuted text-sm font-semibold uppercase tracking-wider mb-2">Total Registrations</span>
              <span className="text-4xl font-bold text-github-green">{dashboardStats.totalRegistrations}</span>
            </div>

            <div className="bg-github-canvas border border-github-border rounded-lg p-6 shadow-sm overflow-hidden flex flex-col">
              <span className="text-github-textMuted text-sm font-semibold uppercase tracking-wider mb-3">By Workshop</span>
              <div className="overflow-y-auto max-h-32 pr-2 space-y-2">
                {Object.entries(dashboardStats.workshopCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([title, count]) => (
                    <div key={title} className="flex justify-between items-center text-sm border-b border-github-border/50 pb-1 last:border-0 last:pb-0">
                      <span className="truncate pr-4 text-github-textPrimary">{title}</span>
                      <span className="font-semibold bg-github-border px-2 py-0.5 rounded-full text-xs">{count}</span>
                    </div>
                ))}
                {Object.keys(dashboardStats.workshopCounts).length === 0 && (
                  <span className="text-xs text-github-textMuted italic">No event registrations yet.</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="border border-github-border rounded-lg bg-github-canvas overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-github-border bg-github-header">
                <th className="p-4 text-sm font-semibold">Name</th>
                <th className="p-4 text-sm font-semibold">Email</th>
                <th className="p-4 text-sm font-semibold">Learner Email</th>
                <th className="p-4 text-sm font-semibold">Reg Number</th>
                <th className="p-4 text-sm font-semibold">Enrolled Workshops</th>
                <th className="p-4 text-sm font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersInfo.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-github-textMuted">
                    No users found.
                  </td>
                </tr>
              ) : (
                usersInfo.map(u => (
                  <tr key={u.id} className="border-b border-github-border last:border-0 hover:bg-github-bg/50 transition-colors">
                    <td className="p-4 text-sm font-medium">{u.name}</td>
                    <td className="p-4 text-sm">{u.email}</td>
                    <td className="p-4 text-sm">{u.learneremail}</td>
                    <td className="p-4 text-sm font-mono text-xs">{u.registration_number}</td>
                    <td className="p-4 text-sm">
                      {u.enrolledEvents.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {u.enrolledEvents.map((evTitle, idx) => (
                            <span key={idx} className="bg-github-blue/10 text-github-blue border border-github-blue/20 px-2 py-0.5 rounded-full text-xs">
                              {evTitle}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-github-textMuted text-xs italic">None</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {/* Don't allow deletion of the admin account itself */}
                      {u.email !== "admin@celestis.com" && (
                        <button 
                          onClick={() => handleDeleteUser(u.id)}
                          className="text-red-500 hover:text-red-400 p-2 rounded-md hover:bg-red-500/10 transition"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-github-canvas border border-github-border rounded-lg w-full max-w-lg shadow-xl relative overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="flex items-center justify-between p-4 border-b border-github-border bg-github-header">
              <h2 className="font-semibold text-lg">Add New User</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-github-textMuted hover:text-github-textPrimary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-yellow-500/10 border-b border-yellow-500/20 text-yellow-500 text-xs px-5 py-3 flex gap-3">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <p>Because there is no backend, registering a user here will log you out of your Admin account and into the new user's account automatically.</p>
            </div>
            
            <div className="p-5 overflow-y-auto">
              <form id="addUserForm" onSubmit={handleAddSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Full Name</label>
                  <input required name="name" value={formData.name} onChange={handleFormChange} className="w-full px-3 py-2 rounded bg-github-bg border border-github-border text-sm outline-none focus:border-github-blue" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Email</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleFormChange} className="w-full px-3 py-2 rounded bg-github-bg border border-github-border text-sm outline-none focus:border-github-blue" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Learner Email</label>
                  <input required type="email" name="learneremail" value={formData.learneremail} onChange={handleFormChange} className="w-full px-3 py-2 rounded bg-github-bg border border-github-border text-sm outline-none focus:border-github-blue" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Registration Number</label>
                  <input required name="registrationNumber" value={formData.registrationNumber} onChange={handleFormChange} className="w-full px-3 py-2 rounded bg-github-bg border border-github-border text-sm outline-none focus:border-github-blue" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Password</label>
                    <input required type="password" name="password" minLength={6} value={formData.password} onChange={handleFormChange} className="w-full px-3 py-2 rounded bg-github-bg border border-github-border text-sm outline-none focus:border-github-blue" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Confirm</label>
                    <input required type="password" name="confirmPassword" minLength={6} value={formData.confirmPassword} onChange={handleFormChange} className="w-full px-3 py-2 rounded bg-github-bg border border-github-border text-sm outline-none focus:border-github-blue" />
                  </div>
                </div>
                {addError && <div className="text-red-400 text-xs">{addError}</div>}
              </form>
            </div>
            
            <div className="p-4 border-t border-github-border bg-github-header flex justify-end gap-3 mt-auto">
              <button 
                disabled={isAdding}
                onClick={() => setShowAddModal(false)}
                className="btn-secondary text-sm"
              >
                Cancel
              </button>
              <button 
                form="addUserForm"
                type="submit"
                disabled={isAdding}
                className="btn-primary text-sm flex items-center"
              >
                {isAdding ? <Loader className="w-4 h-4 animate-spin mr-2" /> : null}
                Create User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
