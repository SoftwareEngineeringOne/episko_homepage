/**
 * @module routes/static
 *
 * @description This module exposes an Express router that serves static assets from the "public" folder.
 * It also maps specific endpoints (about, terms, privacy, impressum) to their corresponding HTML files.
 *
 * @requires express
 * @requires node:path
 */

import express from "express";
import path from "node:path";

const router = express.Router();

// Serve static assets from the "public" directory.
router.use(express.static("public"));

/**
 * @route GET /about
 * @description Serves the "about.html" static page.
 */
router.get("/about", getStaticPage("about"));

/**
 * @route GET /terms
 * @description Serves the "terms.html" static page.
 */
router.get("/terms", getStaticPage("terms"));

/**
 * @route GET /privacy
 * @description Serves the "privacy.html" static page.
 */
router.get("/privacy", getStaticPage("privacy"));

/**
 * @route GET /impressum
 * @description Serves the "impressum.html" static page.
 */
router.get("/impressum", getStaticPage("impressum"));

/**
 * Generates a middleware function to serve a static HTML file.
 *
 * @function getStaticPage
 * @param {string} name - Base name of the HTML file (without extension) to be served.
 * @returns {express.RequestHandler} Express middleware that sends the specified HTML file.
 */
function getStaticPage(name) {
  return (_req, res) => {
    res.sendFile(path.join(process.cwd(), "public", `${name}.html`));
  };
}

export default router;
