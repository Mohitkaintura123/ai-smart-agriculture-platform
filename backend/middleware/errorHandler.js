/**
 * Centralized Express error handling middleware.
 * Must be registered LAST (after all routes) in server.js.
 *
 * Usage — in any controller:
 *   throw Object.assign(new Error('Not found'), { status: 404 });
 * or simply:
 *   return next(Object.assign(new Error('Not found'), { status: 404 }));
 */

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log full error in development
  if (process.env.NODE_ENV !== 'production') {
    console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} → ${status} ${message}`);
    if (err.stack) console.error(err.stack);
  }

  res.status(status).json({
    success: false,
    status,
    message,
  });
}

module.exports = errorHandler;
