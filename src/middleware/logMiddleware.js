/**
 * Middleware to log the request method and URL
 * @param req
 * @param res
 * @param next
 */
export const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.url} ${req.method}`);
  next();
};
