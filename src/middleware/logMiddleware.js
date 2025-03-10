/**
 * @module middleware/logMiddleware
 * @description Middleware to log the request method, URL, and timestamp.
 *
 * This middleware prints an informational log with the current ISO timestamp,
 * the requested URL, and the HTTP request method.
 */

/**
 * Logs an informational message with the current timestamp, request URL, and HTTP method.
 *
 * @function consoleLogger
 *
 * @param {Request} req - Express request object.
 * @param {Response} _res - Express response object (unused).
 * @param {NextFunction} next - Express next middleware function.
 *
 * @returns {void}
 */
export const consoleLogger = (req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.url} ${req.method}`);
  next();
};
