/**
 * Error handler middleware
 * @param err
 * @param req
 * @param res
 * @param next
 */
export function errorHandler(err, req, res, next) {
  console.error("Error:", err.message);

  const statusCode = err.status || 500;
  console.error("Status:", err.status);

  res.status(statusCode).render("error", {
    title: "Error",
    message: err.message,
    error: process.env.NODE_ENV === "development" ? err : {},
  });
}

/**
 * Not found handler middleware
 * @param req
 * @param res
 * @param next
 */
export function notFoundHandler(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
}
