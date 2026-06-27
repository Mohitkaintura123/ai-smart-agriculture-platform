import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import { features } from '../data/mockData';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-20 lg:py-24 bg-surface" id="features-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
              Platform Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Everything Your Farm Needs
            </h2>
            <p className="text-text-secondary text-base leading-relaxed">
              From real-time weather intelligence to AI-powered crop analysis, AgriSmart provides 
              a complete toolkit for modern agriculture in Uttarakhand.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Banner */}
      <section className="py-16 bg-gradient-to-r from-primary-dark via-primary to-primary-dark relative overflow-hidden" id="stats-section">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-white/5 rounded-full blur-2xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: '1,284', label: 'Registered Farmers', icon: '👨‍🌾' },
              { value: '8', label: 'Districts Covered', icon: '🗺️' },
              { value: '3,450+', label: 'Crops Being Tracked', icon: '🌱' },
              { value: '42', label: 'Active Cooperatives', icon: '🤝' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/65 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24 bg-surface" id="cta-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary-dark to-primary rounded-3xl p-10 lg:p-16 relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left max-w-xl">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                  Ready to Transform Your Farming?
                </h2>
                <p className="text-white/75 text-base lg:text-lg leading-relaxed">
                  Join thousands of farmers across Uttarakhand who are using AgriSmart to make 
                  smarter agricultural decisions with AI-powered insights and real-time data.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-primary-dark font-bold rounded-2xl text-base hover:bg-green-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
                  id="cta-get-started"
                >
                  Get Started Free
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-white/10 text-white font-semibold rounded-2xl text-base border border-white/25 hover:bg-white/20 transition-all duration-300 whitespace-nowrap"
                  id="cta-learn-more"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Districts */}
      <section className="py-16 bg-white dark:bg-card" id="districts-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1 bg-secondary/10 text-secondary-dark text-sm font-semibold rounded-full mb-4">
            Region Focus
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
            Serving Districts Across Uttarakhand
          </h2>
          <p className="text-text-secondary text-base mb-10 max-w-lg mx-auto">
            District-specific weather data, crop recommendations, and agricultural guidance tailored for each region.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {['Dehradun', 'Haridwar', 'Almora', 'Chamoli', 'Udham Singh Nagar', 'Nainital', 'Uttarkashi', 'Pithoragarh'].map((district) => (
              <span
                key={district}
                className="px-5 py-2.5 bg-surface dark:bg-surface-dark rounded-xl text-sm font-medium text-text-secondary border border-gray-100 dark:border-white/10 hover:border-primary/30 hover:bg-primary/5 hover:text-primary-dark transition-all duration-200 cursor-default"
              >
                📍 {district}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
