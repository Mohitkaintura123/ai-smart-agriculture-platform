import { useEffect } from 'react';

const VARIANT_STYLES = {
  success: {
    wrapper: 'bg-success/10 border-success/30 text-success',
    icon: '✅',
  },
  error: {
    wrapper: 'bg-danger/10 border-danger/30 text-danger',
    icon: '⛔',
  },
  warning: {
    wrapper: 'bg-warning/10 border-warning/30 text-warning',
    icon: '⚠️',
  },
  info: {
    wrapper: 'bg-accent/10 border-accent/30 text-accent',
    icon: 'ℹ️',
  },
};

/**
 * Self-positioning toast notification with optional auto-dismiss.
 *
 * <Toast message="Saved successfully" type="success" isVisible={show} onClose={() => setShow(false)} />
 */
export default function Toast({
  message,
  type = 'info',
  isVisible = true,
  onClose,
  duration = 4000,
  position = 'bottom-right',
}) {
  useEffect(() => {
    if (!isVisible || !duration || !onClose) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const styles = VARIANT_STYLES[type] || VARIANT_STYLES.info;
  const positionStyles = {
    'bottom-right': 'bottom-5 right-5',
    'bottom-left': 'bottom-5 left-5',
    'top-right': 'top-5 right-5',
    'top-left': 'top-5 left-5',
    'top-center': 'top-5 left-1/2 -translate-x-1/2',
  };

  return (
    <div
      role="status"
      className={`fixed z-[200] ${positionStyles[position] || positionStyles['bottom-right']} animate-slide-down`}
    >
      <div
        className={`flex items-start gap-3 min-w-[260px] max-w-sm px-4 py-3.5 rounded-2xl border shadow-lg backdrop-blur-sm bg-card ${styles.wrapper}`}
      >
        <span className="text-lg leading-none mt-0.5">{styles.icon}</span>
        <p className="flex-1 text-sm font-medium text-text-primary">{message}</p>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss notification"
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
