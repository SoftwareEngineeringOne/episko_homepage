/**
 * @module app
 * @description Main application module that configures the Express server, routes, and middleware.
 */
import express from "express";
import session from "express-session";
import path from "node:path";
import authRouter from "./routes/auth.js";
import postsRouter from "./routes/posts.js";
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";
import staticRouter from "./routes/static.js";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware.js";
import { consoleLogger } from "./middleware/logMiddleware.js";
import { pugMiddleware } from "./middleware/pugMiddleware.js";
import { cookieParser } from "./middleware/cookieMiddleware.js";

/* ---- Express Application Configuration ---- */
const app = express();

console.log(`Running in ${process.env.NODE_ENV} mode`);

const PORT = process.env.PORT || 3000;

app.set("views", path.join("src", "views"));
app.set("view engine", "pug");

app.use(consoleLogger);

/* ---- Environment dependant configuration ---- */
if (process.env.NODE_ENV == "production") {
  console.log("WARNING: Running in production mode");
  console.log("Express session is not setup for production");
  console.log(
    "\t The default memory store will leak memory and will not scale",
  );
  console.log("\t Please configure a session store such as redis");
  console.log("\t Furthermore no secure secrets are configured for production");

  // In production static files are served by the
  // nginx webserver.
  console.log("Static files are served by a nginx webserver.");
} else {
  // Serve static files over node when not in production environment
  app.use(staticRouter);
}

/* ---- Middleware Configuration ---- */

app.use(cookieParser);
app.use(
  session({
    secret: "unsafe",
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(pugMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* ---- Routes Configuration ---- */

app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/admin", adminRouter);
app.use("/user", userRouter);

/* ---- Error Handling Middleware ---- */

app.use(notFoundHandler);
app.use(errorHandler);

/**
 * Start the server listening on the specified port.
 */
app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});

export default app;
