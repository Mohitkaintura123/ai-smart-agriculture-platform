import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { languages } from '../data/mockData';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/crops', label: 'Crops' },
    { to: '/assistant', label: 'AI Assistant' },
  ];

  const activeLang = languages.find((l) => l.code === currentLanguage);

  const handleLanguageChange = (code) => {
    setCurrentLanguage(code);
    setIsLangDropdownOpen(false);
    // TODO: Integrate with i18n context for actual language switching
  };

  return (
    <nav
      className="bg-white/95 dark:bg-card/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-primary/10 dark:border-white/10"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" id="nav-logo">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <span className="text-white text-lg">🌾</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary-dark leading-tight tracking-tight">
                AgriSmart
              </span>
              <span className="text-[10px] text-text-muted leading-none -mt-0.5 hidden sm:block">
                Uttarakhand Agriculture Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/10 text-primary-dark'
                      : 'text-text-secondary hover:bg-surface-dark hover:text-text-primary'
                  }`
                }
                id={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side: Language Switcher + Login */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative" id="language-switcher">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 hover:border-primary/30 hover:bg-surface dark:hover:bg-surface-dark text-sm font-medium text-text-secondary transition-all duration-200"
                aria-label="Select language"
                aria-expanded={isLangDropdownOpen}
              >
                <span className="text-base">🌐</span>
                <span>{activeLang?.nativeLabel}</span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-card rounded-xl shadow-lg border border-gray-100 dark:border-white/10 py-1 animate-slide-down z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-surface transition-colors ${
                        currentLanguage === lang.code ? 'text-primary font-semibold bg-primary/5' : 'text-text-secondary'
                      }`}
                    >
                      <span>{lang.nativeLabel}</span>
                      {currentLanguage === lang.code && (
                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Login Button */}
            <Link
              to="/login"
              className="px-5 py-2 bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              id="nav-login-button"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-surface-dark transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            id="mobile-menu-button"
          >
            <svg className="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 dark:border-white/10 bg-white dark:bg-card animate-slide-down" id="mobile-menu">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary-dark'
                      : 'text-text-secondary hover:bg-surface'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Mobile Language Switcher */}
            <div className="border-t border-gray-100 dark:border-white/10 pt-3 mt-2">
              <p className="px-4 text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Language</p>
              <div className="flex gap-2 px-4">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentLanguage === lang.code
                        ? 'bg-primary text-white'
                        : 'bg-surface dark:bg-surface-dark text-text-secondary hover:bg-surface-dark'
                    }`}
                  >
                    {lang.nativeLabel}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Theme Toggle */}
            <div className="flex items-center justify-between px-4 pt-3">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Appearance</p>
              <ThemeToggle />
            </div>

            {/* Mobile Login */}
            <div className="pt-3">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold rounded-xl"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
