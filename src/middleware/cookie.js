/**
 * Middleware to parse cookies from the request headers
 * @param req
 * @param res
 * @param next
 */
export const cookieMiddleware = (req, res, next) => {
  req.cookies = parseCookies(req.headers.cookie);
  next();
};

/**
 * Parses the cookie header and returns an object with the cookies
 * @param cookieHeader
 * @returns {{}}
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
