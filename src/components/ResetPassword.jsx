import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Loader } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useEffect } from "react";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validSession, setValidSession] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
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

    const { password, confirmPassword } = formData;

    // ✅ validation
    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // 🔥 Supabase updates password using session from reset link
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }

      // ✅ success
      setSuccess("Password updated successfully!");
      setFormData({ password: "", confirmPassword: "" });

      // redirect after short delay
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };
  useEffect(() => {
    const handleRecovery = async () => {
      const hash = window.location.hash;

      if (hash) {
        const { error } = await supabase.auth.exchangeCodeForSession(hash);

        if (error) {
          setError("Invalid or expired reset link");
        }
      }
    };

    handleRecovery();
  }, []);
  return (
    <div className="min-h-screen bg-github-bg text-github-textPrimary flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
          <p className="text-github-textMuted">Enter your new password below</p>
        </div>

        {/* Form */}
        <div className="rounded-lg border border-github-border p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-github-textMuted" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-md bg-github-bg border border-github-border focus:border-github-blue outline-none"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-github-textMuted" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-md bg-github-bg border border-github-border focus:border-github-blue outline-none"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 rounded-md bg-red-100 border border-red-400 text-red-800 text-sm">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="p-3 rounded-md bg-green-100 border border-green-400 text-green-800 text-sm">
                {success}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-2.5 flex items-center justify-center font-semibold"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </button>
          </form>

          {/* Back to login */}
          <div className="mt-4 text-center">
            <Link
              to="/login"
              className="text-sm text-github-blue hover:underline"
            >
              Back to login
            </Link>
          </div>
        </div>

        {/* Register */}
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
