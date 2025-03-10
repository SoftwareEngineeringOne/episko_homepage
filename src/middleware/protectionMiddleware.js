export const protectedMiddleware = {
  roleProtection: (allowedRoles) => {
    return (req, res, next) => {
      if (!req.session.user) {
        if (req.method === "GET") {
          const next = req.originalUrl
            ? `?next=${encodeURIComponent(req.originalUrl)}`
            : "";
          res.redirect("/auth/login" + next);
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
