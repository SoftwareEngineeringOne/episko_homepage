/**
 * Utility methods for controllers.
 * @module util/controller
 */

/**
 * Ends the response with a 400 Bad Request status.
 *
 * @param {object} res - HTTP ServerResponse object.
 * @param {string} [message="Bad Request"] - The error message.
 */
export function endBadRequest(res, message = "Bad Request") {
  endResponseText(res, 400, message);
}

/**
 * Ends the response with a 200 Success status.
 *
 * @param {object} res - HTTP ServerResponse object.
 * @param {string} [message=""] - The success message.
 */
export function endSuccess(res, message = "") {
  endResponseText(res, 200, message);
}

/**
 * Ends the response with a 500 Internal Server Error status.
 *
 * @param {object} res - HTTP ServerResponse object.
 * @param {string} [message="Internal Server Error"] - The error message.
 */
export function endInternalError(res, message = "Internal Server Error") {
  endResponseText(res, 500, message);
}

/**
 * Ends the response with a 404 Not Found status.
 *
 * @param {object} res - HTTP ServerResponse object.
 * @param {string} [message="Not Found"] - The error message.
 */
export function endNotFound(res, message = "Not Found") {
  endResponseText(res, 404, message);
}

/**
 * Ends the HTTP response with a specified status code and message.
 *
 * @param {object} res - HTTP ServerResponse object.
 * @param {number} code - HTTP status code.
 * @param {string} [message=""] - The response message.
 */
export function endResponseText(res, code, message = "") {
  res.writeHead(code, { "ContentType": "text/plain" });
  res.end(message);
}
