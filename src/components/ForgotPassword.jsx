import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader, User } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    registrationNumber: "",
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

    const { registrationNumber } = formData;

    // ✅ validation
    if (!registrationNumber) {
      setError("Please enter your registration number");
      setLoading(false);
      return;
    }

    try {
      // 🔥 Step 1: get email from profiles
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("email")
        .eq("registration_number", registrationNumber)
        .single();

      if (profileError || !profile) {
        setError("User not found");
        setLoading(false);
        return;
      }

      // 🔥 Step 2: send reset email
      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(profile.email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });

      if (resetError) {
        setError(resetError.message);
        setLoading(false);
        return;
      }

      // ✅ success
      setSuccess("Password reset link sent to your email");
      setFormData({ registrationNumber: "" });

    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-github-bg text-github-textPrimary flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">
            Reset Password
          </h1>
          <p className="text-github-textMuted">
            Enter your registration number to receive a reset link
          </p>
        </div>

        {/* Form */}
        <div className="rounded-lg border border-github-border p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Registration Number */}
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
                  Sending...
                </>
              ) : (
                "Send Reset Link"
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