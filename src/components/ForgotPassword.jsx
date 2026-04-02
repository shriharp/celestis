import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader, User, Mail } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    registrationNumber: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const { registrationNumber, email } = formData;

    if (!registrationNumber || !email) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    const cleanEmail = email.toLowerCase().trim();

    try {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("email")
        .eq("registration_number", registrationNumber)
        .single();

      if (profileError || !profile) {
        setError("No account found with that registration number");
        setLoading(false);
        return;
      }

      if (profile.email.toLowerCase() !== cleanEmail) {
        setError("Email does not match our records for this registration number");
        setLoading(false);
        return;
      }

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        cleanEmail,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );

// NEW
        if (resetError) {
        setError(resetError.message || "Failed to send reset email. Please try again or contact support.");
        setLoading(false);
        return;
      }

      setSuccess(
        `Password reset link sent to ${cleanEmail}. Please check your inbox (and spam folder).`
      );
      setFormData({ registrationNumber: "", email: "" });
     // NEW
} catch (err) {
  setError(err?.message || "Request timed out. Please check your connection and try again.");
}

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-github-bg text-github-textPrimary flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
          <p className="text-github-textMuted">
            Enter your registration number and email to receive a reset link
          </p>
        </div>

        <div className="rounded-lg border border-github-border p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Registration Number
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-github-textMuted" />
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  placeholder="e.g. 22BCE1234"
                  className="w-full pl-10 pr-4 py-2.5 rounded-md bg-github-bg border border-github-border focus:border-github-blue outline-none"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-github-textMuted" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-md bg-github-bg border border-github-border focus:border-github-blue outline-none"
                  disabled={loading}
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-md bg-red-100 border border-red-400 text-red-800 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 rounded-md bg-green-100 border border-green-400 text-green-800 text-sm">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-2.5 flex items-center justify-center font-semibold"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link
              to="/login"
              className="text-sm text-github-blue hover:underline"
            >
              Back to login
            </Link>
          </div>
        </div>

        <div className="text-center">
          <p className="text-github-textMuted text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-github-blue font-semibold hover:underline"
            >
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}