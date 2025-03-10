/**
 * @module middleware/protectionMiddleware
 * @description Provides middleware functions to restrict route access based on user roles.
 */

/**
 * Middleware object for protecting routes.
 * @typedef {Object} ProtectionMiddleware
 * @property {function(Array<*>): function(Request, Response, NextFunction): void} roleRequired - Returns a middleware function which allows access only if the user's role is in the allowedRoles array.
 */

/**
 * An object containing middleware functions for protecting routes.
 * @type {ProtectionMiddleware}
 */
export const protectionMiddleware = {
  /**
   * Returns an Express middleware function that restricts access based on allowed roles.
   *
   * @function roleRequired
   * 
   * @param {Array<Role>} allowedRoles - An array of roles permitted to access the route.
   * 
   * @returns {function(Request, Response, NextFunction): void} Middleware function that checks the user's role.
   */
  roleRequired: (allowedRoles) => {
    return (req, res, next) => {
      if (!req.session.user) {
        if (req.method === "GET") {
          const nextQuery = req.originalUrl ? `?next=${encodeURIComponent(req.originalUrl)}` : "";
          res.redirect("/auth/login" + nextQuery);
        } else {
          next({ status: 401, message: "Unauthorized" });
        }
        return;
      }

      if (!allowedRoles.includes(req.session.user.role)) {
        next({ status: 401, message: "Unauthorized" });
        return;
      }
      next();
    };
  },
};
