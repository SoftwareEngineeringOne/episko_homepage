export const pugMiddleware = (req, res, next) => {
  res.locals.session = req.session;
  if (req.query.next) {
    res.locals.originalUrl = req.query.next;
  } else {
    res.locals.originalUrl = req.originalUrl;
  }
  next();
};
