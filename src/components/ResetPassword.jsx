import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Loader } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(true);
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

    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }

      setSuccess("Password updated successfully! Redirecting to login...");
      setFormData({ password: "", confirmPassword: "" });

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  useEffect(() => {
    const handleRecovery = async () => {
      // Supabase v2 sends the reset code as a URL query param: ?code=xxxxx
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          setError(
            "This reset link is invalid or has expired. Please request a new one."
          );
          setValidSession(false);
        } else {
          setValidSession(true);
        }
        setSessionLoading(false);
        return;
      }

      // Fallback for older implicit flow — listen for PASSWORD_RECOVERY event
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event) => {
        if (event === "PASSWORD_RECOVERY") {
          setValidSession(true);
          setError("");
          setSessionLoading(false);
        }
      });

      const timeout = setTimeout(() => {
        setError(
          "No valid reset link found. Please request a new password reset."
        );
        setSessionLoading(false);
      }, 2000);

      return () => {
        subscription.unsubscribe();
        clearTimeout(timeout);
      };
    };

    handleRecovery();
  }, []);

  if (sessionLoading) {
    return (
      <div className="min-h-screen bg-github-bg text-github-textPrimary flex items-center justify-center px-4 py-12">
        <div className="flex flex-col items-center gap-3">
          <Loader className="w-8 h-8 animate-spin text-github-blue" />
          <p className="text-github-textMuted">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  if (!validSession) {
    return (
      <div className="min-h-screen bg-github-bg text-github-textPrimary flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl font-bold mb-4">Link Expired</h1>
          <div className="p-4 rounded-md bg-red-100 border border-red-400 text-red-800 text-sm mb-6">
            {error || "This reset link is invalid or has expired."}
          </div>
          <Link
            to="/forgot-password"
            className="text-github-blue font-semibold hover:underline"
          >
            Request a new reset link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-github-bg text-github-textPrimary flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
          <p className="text-github-textMuted">Enter your new password below</p>
        </div>

        <div className="rounded-lg border border-github-border p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="Min. 6 characters"
                />
              </div>
            </div>

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
                  placeholder="Re-enter new password"
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
                  Updating...
                </>
              ) : (
                "Update Password"
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