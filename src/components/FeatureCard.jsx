export default function FeatureCard({ icon, title, description, index = 0 }) {
  return (
    <article
      className="group bg-card rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-xl border border-gray-100 dark:border-white/10 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 cursor-default animate-fade-in-up [animation-fill-mode:backwards]"
      style={{ animationDelay: `${index * 100}ms` }}
      id={`feature-card-${title?.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Icon */}
      <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-accent/10 transition-all duration-300">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-text-primary mb-3 group-hover:text-primary-dark transition-colors duration-200">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-text-secondary leading-relaxed">
        {description}
      </p>

      {/* Hover Indicator */}
      <div className="mt-5 flex items-center gap-1.5 text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span>Learn more</span>
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </article>
  );
}
