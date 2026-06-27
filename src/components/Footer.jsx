import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/crops', label: 'Crops' },
    { to: '/assistant', label: 'AI Assistant' },
    { to: '/login', label: 'Login' },
  ];

  const features = [
    'Weather Intelligence',
    'Crop Analysis',
    'AI Assistant',
    'Harvest Planning',
    'Disease Detection',
    'Farm Analytics',
  ];

  const districts = [
    'Dehradun',
    'Haridwar',
    'Almora',
    'Nainital',
    'Chamoli',
    'Uttarkashi',
  ];

  return (
    <footer className="bg-primary-dark text-white" role="contentinfo" id="footer">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center group-hover:bg-white/25 transition-colors">
                <span className="text-lg">🌾</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">AgriSmart</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Empowering farmers and agricultural cooperatives across Uttarakhand with AI-driven insights, 
              weather intelligence, and data-powered crop management.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {['twitter', 'facebook', 'instagram'].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  aria-label={`Follow us on ${social}`}
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                >
                  <SocialIcon name={social} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/80 mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/55 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/80 mb-4">Features</h3>
            <ul className="space-y-2.5">
              {features.map((feature) => (
                <li key={feature}>
                  <span className="text-sm text-white/55">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Supported Districts */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/80 mb-4">Supported Districts</h3>
            <ul className="space-y-2.5">
              {districts.map((district) => (
                <li key={district}>
                  <span className="text-sm text-white/55">{district}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-white/40">
            © {currentYear} AgriSmart. Built for the farmers of Uttarakhand.
          </p>
          <div className="flex items-center gap-1.5 text-sm text-white/40">
            <span>Made with</span>
            <span className="text-red-400">❤</span>
            <span>in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/** Simple inline SVG social icons */
function SocialIcon({ name }) {
  const icons = {
    twitter: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    facebook: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    instagram: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  };

  return icons[name] || null;
}
