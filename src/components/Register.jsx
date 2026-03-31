import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, Loader } from "lucide-react";
import { registerUser } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    learneremail: "",
    registrationNumber: "",
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // ✅ Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.learneremail ||
      !formData.registrationNumber ||
      !formData.password
    ) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (!formData.learneremail.endsWith("@learner.manipal.edu")) {
      setError("Use your learner email");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const result = await registerUser(formData);

    if (result.success) {
      setFormData({
        name: "",
        email: "",
        learneremail: "",
        registrationNumber: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/domains", {
        state: {
          message:
            "Registration successful! Please check your email to verify your account.",
        },
      });
    } else {
      setError(result.error || "Registration failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-github-bg text-github-textPrimary flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 text-github-textPrimary">
            Join Celestis
          </h1>
          <p className="text-github-textMuted">
            Create your account and start your journey
          </p>
        </div>

        {/* Form Card */}
        <div
          className="rounded-lg border border-github-border p-8 mb-6"
          style={{ backgroundColor: "var(--color-canvas)" }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-github-textMuted" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 rounded-md bg-github-bg border border-github-border focus:border-github-blue outline-none text-sm"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Personal Email */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Personal Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-github-textMuted" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 rounded-md bg-github-bg border border-github-border focus:border-github-blue outline-none text-sm"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Learner Email */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Learner Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-github-textMuted" />
                <input
                  type="email"
                  name="learneremail"
                  value={formData.learneremail}
                  onChange={handleChange}
                  placeholder="xyz@learner.manipal.edu"
                  className="w-full pl-10 pr-4 py-2 rounded-md bg-github-bg border border-github-border focus:border-github-blue outline-none text-sm"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Registration Number */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Registration Number
              </label>
              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder="2XXXXXXXX"
                className="w-full px-4 py-2 rounded-md bg-github-bg border border-github-border focus:border-github-blue outline-none text-sm"
                disabled={loading}
              />
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
                  className="w-full pl-10 pr-4 py-2 rounded-md bg-github-bg border border-github-border focus:border-github-blue outline-none text-sm"
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
                  className="w-full pl-10 pr-4 py-2 rounded-md bg-github-bg border border-github-border focus:border-github-blue outline-none text-sm"
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
              className="w-full btn-primary py-2 flex items-center justify-center font-semibold mt-6 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>

        {/* Login */}
        <div className="text-center">
          <p className="text-github-textMuted text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-github-blue font-semibold hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}