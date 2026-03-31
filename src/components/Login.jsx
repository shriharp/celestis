import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Loader, User } from "lucide-react";
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

    const { registrationNumber, password } = formData;

    // ✅ validation
    if (!registrationNumber || !password) {
      setError("Please fill in all fields");
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

      // 🔥 Step 2: login with email
      const { error: loginError } =
        await supabase.auth.signInWithPassword({
          email: profile.email,
          password,
        });

      if (loginError) {
        setError(loginError.message);
        setLoading(false);
        return;
      }

      // ✅ success
      setFormData({ registrationNumber: "", password: "" });
      navigate("/");
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

        {/* Form */}
        <div className="rounded-lg border border-github-border p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Username */}
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

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-2.5 flex items-center justify-center font-semibold"
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

          {/* Forgot */}
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