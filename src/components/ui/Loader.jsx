const SIZE_STYLES = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-[3px]',
  lg: 'w-12 h-12 border-4',
};

const COLOR_STYLES = {
  primary: 'border-primary/20 border-t-primary',
  white: 'border-white/30 border-t-white',
  accent: 'border-accent/20 border-t-accent',
};

/**
 * Reusable loading spinner.
 *
 * <Loader />
 * <Loader size="lg" text="Fetching crop data..." />
 * <Loader fullScreen text="Loading dashboard..." />
 */
export default function Loader({ size = 'md', color = 'primary', text, fullScreen = false, className = '' }) {
  const spinner = (
    <div
      role="status"
      aria-label={text || 'Loading'}
      className={`rounded-full animate-spin ${SIZE_STYLES[size] || SIZE_STYLES.md} ${
        COLOR_STYLES[color] || COLOR_STYLES.primary
      } ${className}`}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center gap-3 bg-surface/90 backdrop-blur-sm">
        {spinner}
        {text && <p className="text-sm font-medium text-text-secondary">{text}</p>}
      </div>
    );
  }

  if (text) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-6">
        {spinner}
        <p className="text-sm font-medium text-text-secondary">{text}</p>
      </div>
    );
  }

  return spinner;
}
