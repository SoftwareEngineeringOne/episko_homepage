/**
 * @module middleware/pugMiddleware
 * @description Middleware to set locals for Pug templates based on the current session and request URL.
 *
 * This middleware adds the current session to the response locals for access in Pug views.
 * It also sets the original URL for redirection purposes based on the query parameter "next", if available.
 */

/**
 * Express middleware function to set Pug template locals.
 *
 * @function pugMiddleware
 * 
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * 
 * @returns {void}
 */
export const pugMiddleware = (req, res, next) => {
  res.locals.session = req.session;
  if (req.query.next) {
    res.locals.originalUrl = req.query.next;
  } else {
    res.locals.originalUrl = req.originalUrl;
  }
  next();
};
