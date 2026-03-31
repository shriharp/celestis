import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Loader, User } from "lucide-react";
import { loginUser } from "../services/authService";
import { supabase } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    registrationNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!formData.registrationNumber || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      // 🔍 1. Lookup email from registration number
      const { data, error: lookupError } = await supabase
        .from("profiles")
        .select("email")
        .eq("registration_number", formData.registrationNumber)
        .single();

      if (lookupError || !data) {
        setError("User not found");
        setLoading(false);
        return;
      }

      // 🔐 2. Login using email + password
      const result = await loginUser(data.email, formData.password);

      if (result.success) {
        setFormData({ registrationNumber: "", password: "" });
        navigate("/");
      } else {
        setError(result.error || "Invalid credentials");
      }
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
            Welcome Back
          </h1>
          <p className="text-github-textMuted">
            Sign in to your Celestis account
          </p>
        </div>

        {/* Form Card */}
        <div
          className="rounded-lg border border-github-border p-8 mb-6"
          style={{ backgroundColor: "var(--color-canvas)" }}
        >
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-md bg-github-bg border border-github-border focus:border-github-blue focus:outline-none"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-github-textMuted" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-md bg-github-bg border border-github-border focus:border-github-blue focus:outline-none"
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-2.5 flex items-center justify-center font-semibold disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Forgot Password */}
          <div className="mt-4 text-center">
            <Link
              to="/forgot-password"
              className="text-sm text-github-blue hover:underline"
            >
              Forgot your password?
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