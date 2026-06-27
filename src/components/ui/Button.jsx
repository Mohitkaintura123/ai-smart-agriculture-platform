import { Link } from 'react-router-dom';

const VARIANT_STYLES = {
  primary:
    'bg-gradient-to-r from-primary to-primary-dark text-white shadow-md hover:shadow-lg hover:shadow-primary/25 focus-visible:ring-primary/30',
  secondary:
    'bg-gradient-to-r from-secondary to-secondary-dark text-white shadow-md hover:shadow-lg hover:shadow-secondary/25 focus-visible:ring-secondary/30',
  accent:
    'bg-gradient-to-r from-accent to-accent-dark text-white shadow-md hover:shadow-lg hover:shadow-accent/25 focus-visible:ring-accent/30',
  outline:
    'bg-transparent border-2 border-primary text-primary dark:text-primary-light hover:bg-primary/10 focus-visible:ring-primary/20',
  ghost:
    'bg-transparent text-text-secondary hover:bg-surface dark:hover:bg-surface-dark hover:text-text-primary focus-visible:ring-primary/15',
  danger:
    'bg-gradient-to-r from-danger to-red-700 text-white shadow-md hover:shadow-lg hover:shadow-danger/25 focus-visible:ring-danger/30',
  white:
    'bg-white text-primary-dark shadow-md hover:bg-green-50 hover:shadow-lg focus-visible:ring-white/40',
};

const SIZE_STYLES = {
  sm: 'px-3.5 py-2 text-xs gap-1.5 rounded-lg',
  md: 'px-5 py-2.5 text-sm gap-2 rounded-xl',
  lg: 'px-8 py-3.5 text-base gap-2 rounded-2xl',
};

/**
 * Reusable button. Renders a <button>, a react-router <Link> (when `to` is
 * supplied), or an <a> (when `href` is supplied) — all sharing one visual
 * language.
 *
 * <Button text="Login" variant="primary" />
 * <Button to="/dashboard" variant="white" icon={<ArrowIcon />} />
 * <Button text="Delete" variant="danger" size="sm" loading={isDeleting} />
 */
export default function Button({
  text,
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  iconPosition = 'left',
  fullWidth = false,
  loading = false,
  disabled = false,
  type = 'button',
  to,
  href,
  onClick,
  className = '',
  id,
  ...rest
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none disabled:translate-y-0 disabled:hover:translate-y-0 whitespace-nowrap';

  const composedClassName = `${baseStyles} ${VARIANT_STYLES[variant] || VARIANT_STYLES.primary} ${
    SIZE_STYLES[size] || SIZE_STYLES.md
  } ${fullWidth ? 'w-full' : ''} ${className}`;

  const content = (
    <>
      {loading ? (
        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>
      )}
      <span>{loading ? 'Loading...' : children || text}</span>
      {!loading && icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} id={id} className={composedClassName} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} id={id} className={composedClassName} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      id={id}
      onClick={onClick}
      disabled={disabled || loading}
      className={composedClassName}
      {...rest}
    >
      {content}
    </button>
  );
}
