import { Link } from 'react-router-dom';

export default function About() {
  const steps = [
    { number: '01', title: 'Real-Time Weather Intelligence', desc: 'Accurate forecasts and alerts specific to each district.' },
    { number: '02', title: 'AI-Powered Crop Guidance', desc: 'Personalized recommendations based on weather, crop type, and history.' },
    { number: '03', title: 'Cooperative Management', desc: 'Tools to track farmers, monitor crops, and plan harvests.' },
    { number: '04', title: 'Accessible Design', desc: 'Hindi and English with voice support and simple navigation.' },
  ];

  const capabilities = [
    { icon: '🌤️', title: 'Weather Intelligence', desc: 'Current conditions, forecasts, and severe weather alerts for all 8 districts.', color: 'from-blue-500/10 to-cyan-500/10' },
    { icon: '📸', title: 'Image Analysis', desc: 'Upload crop photos to detect diseases and nutritional deficiencies.', color: 'from-purple-500/10 to-pink-500/10' },
    { icon: '🗣️', title: 'Voice Assistant', desc: 'Ask farming questions using voice commands in Hindi.', color: 'from-orange-500/10 to-amber-500/10' },
    { icon: '📊', title: 'Analytics Dashboard', desc: 'Track yield trends and crop performance with visual analytics.', color: 'from-green-500/10 to-emerald-500/10' },
    { icon: '📅', title: 'Harvest Scheduler', desc: 'Plan harvest timings based on crop maturity and weather windows.', color: 'from-red-500/10 to-rose-500/10' },
    { icon: '👥', title: 'Farmer Management', desc: 'Register farmers, track records, and manage group activities.', color: 'from-teal-500/10 to-sky-500/10' },
  ];

  const futureFeatures = ['ML Yield Prediction', 'Disease Forecasting', 'Irrigation Intelligence', 'Village-Level Data'];

  return (
    <main className="bg-surface">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-light py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full border border-white/20 text-white/90 text-sm font-medium mb-6">
            🌱 About AgriSmart
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Transforming Agriculture<br className="hidden sm:block" />
            <span className="text-green-300">Through Technology</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            AgriSmart brings AI and data analytics to farmers and cooperatives across Uttarakhand.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 text-surface">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,40 1440,40 L1440,80 L0,80 Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 lg:py-24" id="mission-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-5">Our Mission</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">Empowering Every Farmer with Data-Driven Intelligence</h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Agriculture in Uttarakhand faces unique challenges — unpredictable mountain weather and fragmented landholdings. Our mission is to bridge the technology gap and give every farmer access to advanced tools.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                AgriSmart combines real-time weather data, satellite imagery, and AI-powered crop analysis to deliver actionable recommendations in Hindi and English.
              </p>
              <div className="flex flex-wrap gap-3">
                {['🎯 Data-Driven', '🌏 Multilingual', '🤖 AI-Powered'].map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-white dark:bg-card rounded-xl shadow-sm border border-gray-100 dark:border-white/10 text-sm font-medium text-text-primary">{tag}</span>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-card rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-white/10">
              <div className="space-y-6">
                {steps.map((item) => (
                  <div key={item.number} className="flex gap-4 group">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-all duration-300">
                      <span className="text-sm font-bold text-primary group-hover:text-white transition-colors">{item.number}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">{item.title}</h3>
                      <p className="text-sm text-text-secondary">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 bg-white dark:bg-card" id="about-features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1 bg-accent/10 text-accent text-sm font-semibold rounded-full mb-4">Platform Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">Built for Uttarakhand Agriculture</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((f) => (
              <div key={f.title} className="group p-6 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>{f.icon}</div>
                <h3 className="font-bold text-text-primary mb-2">{f.title}</h3>
                <p className="text-sm text-text-secondary">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 bg-surface" id="vision-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary-dark to-primary rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative max-w-2xl mx-auto">
              <span className="text-5xl mb-6 block">🚀</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Our Vision for the Future</h2>
              <p className="text-white/80 lg:text-lg leading-relaxed mb-8">
                We envision every farmer in Uttarakhand having access to ML yield predictions, precision irrigation, and village-specific recommendations.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {futureFeatures.map((item) => (
                  <span key={item} className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-sm text-white/90 font-medium">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white dark:bg-card text-center" id="about-cta">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">Ready to Get Started?</h2>
          <p className="text-text-secondary mb-8">Explore the dashboard or join our community of tech-savvy farmers.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/dashboard" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5" id="about-cta-dashboard">
              Open Dashboard
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
            <Link to="/login" className="inline-flex items-center justify-center px-8 py-3.5 bg-surface text-text-primary font-semibold rounded-2xl border border-gray-200 dark:border-white/10 hover:border-primary/30 transition-all" id="about-cta-login">
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
