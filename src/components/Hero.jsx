import { Link } from 'react-router-dom';
import heroBg from '../assets/images/hero-bg.png';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden" id="hero-section">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Lush green terraced fields in Uttarakhand"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary-dark/70 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Decorative Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl animate-pulse-slow delay-500" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">
              AI-Powered Agriculture for Uttarakhand
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 [animation-fill-mode:backwards]">
            Smart Farming
            <span className="block text-green-300">Starts Here</span>
          </h1>

          {/* Subtext */}
          <p className="animate-fade-in-up delay-200 text-lg sm:text-xl text-white/85 leading-relaxed mb-8 max-w-xl [animation-fill-mode:backwards]">
            Empowering farmers and cooperatives across Uttarakhand with real-time weather intelligence, 
            AI crop analysis, and data-driven agricultural guidance — in Hindi and English.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 [animation-fill-mode:backwards]">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-primary-dark font-bold rounded-2xl text-base hover:bg-green-50 hover:shadow-xl hover:shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              id="hero-cta-dashboard"
            >
              <span>Open Dashboard</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl text-base border border-white/25 hover:bg-white/20 hover:border-white/40 transition-all duration-300"
              id="hero-cta-about"
            >
              Learn More
            </Link>
          </div>

          {/* Stats Row */}
          <div className="animate-fade-in-up delay-500 grid grid-cols-3 gap-6 mt-14 pt-8 border-t border-white/15 max-w-lg [animation-fill-mode:backwards]">
            {[
              { value: '1,280+', label: 'Farmers Registered' },
              { value: '8', label: 'Districts Covered' },
              { value: '3,400+', label: 'Crops Tracked' },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs sm:text-sm text-white/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 text-surface">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full">
          <path
            d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,40 1440,40 L1440,80 L0,80 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
