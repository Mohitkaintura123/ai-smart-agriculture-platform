import { useContext } from 'react';
import { ThemeContext } from './themeContextInstance';

/**
 * Access the current theme and toggle function from anywhere in the app.
 * Must be used within a <ThemeProvider>.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
