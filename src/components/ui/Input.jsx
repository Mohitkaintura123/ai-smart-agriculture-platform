import { useId, useState } from 'react';

/**
 * Reusable form input with optional label, leading icon, helper/error text,
 * and built-in password visibility toggle.
 *
 * <Input label="Email Address" type="email" placeholder="Enter email" />
 * <Input label="Password" type="password" error="Password is required" />
 */
export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  icon = null,
  error,
  helperText,
  id,
  name,
  required = false,
  disabled = false,
  fullWidth = true,
  className = '',
  ...rest
}) {
  const generatedId = useId();
  const inputId = id || `input-${generatedId}`;
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const resolvedType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-semibold text-text-primary mb-2">
          {label}
          {required && <span className="text-danger ml-0.5">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
            {icon}
          </span>
        )}

        <input
          id={inputId}
          name={name || inputId}
          type={resolvedType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          className={`w-full py-3 bg-white dark:bg-surface-dark border rounded-xl text-text-primary placeholder-text-muted outline-none transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${
            icon ? 'pl-12' : 'pl-4'
          } ${isPassword ? 'pr-12' : 'pr-4'} ${
            error
              ? 'border-danger focus:border-danger focus:ring-2 focus:ring-danger/20'
              : 'border-gray-200 dark:border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20'
          } ${className}`}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        )}
      </div>

      {error ? (
        <p className="mt-1.5 text-xs text-danger font-medium">{error}</p>
      ) : helperText ? (
        <p className="mt-1.5 text-xs text-text-muted">{helperText}</p>
      ) : null}
    </div>
  );
}
