/**
 * @module middleware/cookieMiddleware
 * @description Middleware to parse cookies from the request headers.
 */

/**
 * Middleware function that parses cookies from the request headers and attaches them to req.cookies.
 *
 * @function cookieParser
 *
 * @param {Request} req - Express request object.
 * @param {Response} _res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 *
 * @returns {void}
 */
export const cookieParser = (req, _res, next) => {
  req.cookies = parseCookies(req.headers.cookie);
  next();
};

/**
 * Parses a cookie header string and returns an object mapping cookie names to values.
 *
 * @private
 * @function parseCookies
 *
 * @param {string} cookieHeader - The cookie header string from the request.
 *
 * @returns {Object} An object containing cookie key-value pairs.
 */
function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  const parts = cookieHeader.split(";");
  for (const part of parts) {
    const [name, value] = part.trim().split("=");
    cookies[name] = value;
  }
  return cookies;
}
