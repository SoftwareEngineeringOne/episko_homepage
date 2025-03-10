/**
 * @module middleware/errorMiddleware
 * @description Provides middleware functions for handling errors throughout the application.
 *
 * This module exports two middleware functions:
 * - errorHandler: Logs errors and sends an appropriate error response.
 * - notFoundHandler: Generates a 404 "Not Found" error for unmatched routes.
 */

/**
 * Express error handling middleware that logs error details and sends an appropriate response.
 *
 * @function errorHandler
 *
 * @param {Error} err - The error object to be handled.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} _next - Express next middleware function.
 *
 * @returns {void}
 */
export function errorHandler(err, req, res, _next) {
  console.error("Error:", err.message);

  const statusCode = err.status || 500;
  console.error("Status:", err.status);

  if (req.method === "GET") {
    res.status(statusCode).render("error", {
      title: "Error",
      message: err.message,
      error: process.env.NODE_ENV === "development" ? err : {},
    });
  } else {
    res.status(statusCode).end(err.message);
  }
}

/**
 * Express middleware that handles 404 Not Found errors.
 *
 * @function notFoundHandler
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 *
 * @returns {void}
 */
export function notFoundHandler(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
}
