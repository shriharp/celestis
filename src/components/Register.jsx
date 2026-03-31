import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Loader } from 'lucide-react';
import { registerUser } from '../services/authService';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    registrationNumber: '',
    collegeName: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Client-side validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.registrationNumber ||
      !formData.collegeName ||
      !formData.password
    ) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const result = await registerUser(formData);

    if (result.success) {
      // Redirect to login or home based on your flow
      setFormData({
        name: '',
        email: '',
        registrationNumber: '',
        collegeName: '',
        password: '',
        confirmPassword: '',
      });
      navigate('/login', {
        state: { message: 'Registration successful! Please check your email to verify your account.' },
      });
    } else {
      setError(result.error || 'Registration failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-github-bg text-github-textPrimary flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 text-github-textPrimary">Join Celestis</h1>
          <p className="text-github-textMuted">Create your account and start your journey</p>
        </div>

        {/* Form Card */}
        <div
          className="rounded-lg border border-github-border p-8 mb-6"
          style={{ backgroundColor: 'var(--color-canvas)' }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-github-textPrimary mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-github-textMuted" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2 rounded-md text-github-textPrimary bg-github-bg border border-github-border focus:border-github-blue focus:outline-none transition-colors text-sm"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-github-textPrimary mb-2">
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
                  className="w-full pl-10 pr-4 py-2 rounded-md text-github-textPrimary bg-github-bg border border-github-border focus:border-github-blue focus:outline-none transition-colors text-sm"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Registration Number Field */}
            <div>
              <label className="block text-sm font-semibold text-github-textPrimary mb-2">
                Registration Number
              </label>
              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder="REG-2024-001"
                className="w-full px-4 py-2 rounded-md text-github-textPrimary bg-github-bg border border-github-border focus:border-github-blue focus:outline-none transition-colors text-sm"
                disabled={loading}
              />
            </div>

            {/* College Name Field */}
            <div>
              <label className="block text-sm font-semibold text-github-textPrimary mb-2">
                College Name
              </label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                placeholder="Your College"
                className="w-full px-4 py-2 rounded-md text-github-textPrimary bg-github-bg border border-github-border focus:border-github-blue focus:outline-none transition-colors text-sm"
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-github-textPrimary mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-github-textMuted" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 rounded-md text-github-textPrimary bg-github-bg border border-github-border focus:border-github-blue focus:outline-none transition-colors text-sm"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-semibold text-github-textPrimary mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-github-textMuted" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 rounded-md text-github-textPrimary bg-github-bg border border-github-border focus:border-github-blue focus:outline-none transition-colors text-sm"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-md bg-red-100 border border-red-400 text-red-800 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-2 flex items-center justify-center font-semibold disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-github-textMuted text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-github-blue font-semibold hover:underline transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
