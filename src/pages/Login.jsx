import { useState } from 'react';
import { Button, Input } from '../components/ui';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Replace with authService.login(email, password) from services/api.js
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      alert('Login functionality will be connected to Supabase Auth in the next phase.');
    }, 1200);
  };

  return (
    <main className="min-h-screen flex">
      {/* Left Panel — Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-dark via-primary to-primary-light relative overflow-hidden items-center justify-center p-12">
        {/* Decorative shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative text-center max-w-md">
          <div className="w-20 h-20 bg-white/15 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-white/20">
            <span className="text-4xl">🌾</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Welcome to AgriSmart</h2>
          <p className="text-white/75 text-lg leading-relaxed mb-10">
            Your intelligent agriculture companion for Uttarakhand. Access weather data, crop analysis, 
            and AI-powered farming guidance.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {['Weather Intelligence', 'Crop Analysis', 'AI Assistant', 'Harvest Planning'].map((f) => (
              <span key={f} className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-sm text-white/85 font-medium">
                {f}
              </span>
            ))}
          </div>

          {/* Testimonial */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/15 text-left">
            <p className="text-white/80 text-sm leading-relaxed italic mb-4">
              "AgriSmart helped our cooperative increase wheat yield by 23% last season. 
              The weather alerts alone saved us from significant crop damage."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg">👨‍🌾</div>
              <div>
                <p className="text-white font-semibold text-sm">Ramesh Kumar</p>
                <p className="text-white/50 text-xs">Cooperative Manager, Dehradun</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-surface">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white text-lg">🌾</span>
            </div>
            <span className="text-xl font-bold text-primary-dark">AgriSmart</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">Sign in to your account</h1>
            <p className="text-text-secondary">
              Access your farm dashboard, weather data, and AI-powered insights.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" id="login-form">
            {/* Email */}
            <Input
              label="Email Address"
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="farmer@agrismart.in"
              required
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            />

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="login-password" className="block text-sm font-semibold text-text-primary">
                  Password
                </label>
                <button type="button" className="text-xs text-accent hover:text-accent-dark font-medium transition-colors">
                  Forgot password?
                </button>
              </div>
              <Input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                id="remember-me"
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 dark:border-white/20 text-primary focus:ring-primary/20 cursor-pointer"
              />
              <label htmlFor="remember-me" className="text-sm text-text-secondary cursor-pointer select-none">
                Remember me on this device
              </label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              text="Sign In"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              id="login-submit-button"
            />
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
            <span className="text-sm text-text-muted">New to AgriSmart?</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
          </div>

          {/* Sign Up Link */}
          <Button
            to="/about"
            text="Learn More & Join"
            variant="outline"
            fullWidth
            id="login-signup-link"
          />

          {/* Footer */}
          <p className="text-center text-xs text-text-muted mt-8">
            By signing in, you agree to AgriSmart's Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </main>
  );
}
