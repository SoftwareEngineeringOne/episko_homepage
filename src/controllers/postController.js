/**
 * @module controllers/postController
 * @description Contains controller methods for handling post-related requests.
 *
 * @requires ../models/post.js
 * @requires ../models/user.js
 * @requires ../util/controller.js
 */
import Post, { Statusse } from "../models/post.js";
import { Roles } from "../models/user.js";
import {
  endBadRequest,
  endInternalError,
  endNotFound,
  endSuccess,
} from "../util/controller.js";

/**
 * Post Controller object.
 * @typedef {Object} PostController
 * @property {function(Request, Response, NextFunction): Promise<void>} displayPublicPosts - Renders the public posts page.
 * @property {function(Request, Response, NextFunction): Promise<void>} displayPostWithId - Renders a single post based on its ID.
 * @property {function(Request, Response, NextFunction): Promise<void>} displayForm - Renders a form for creating or editing a post.
 * @property {function(Request, Response): Promise<void>} createPost - Creates a new post.
 * @property {function(Request, Response): Promise<void>} updatePost - Updates an existing post.
 * @property {function(Request, Response): Promise<void>} publishPost - Publishes a post.
 * @property {function(Request, Response): Promise<void>} archivePost - Archives a post.
 * @property {function(Request, Response): Promise<void>} deletePost - Deletes a post.
 */
export const PostController = {
  /**
   * Renders the public posts page.
   *
   * @async
   * @function displayPublicPosts
   * @param {Request} _req - Express request object (unused).
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @returns {Promise<void>}
   */
  displayPublicPosts: async (_req, res, next) => {
    try {
      const posts = await Post.getPublic();
      res.render("posts/posts", { posts });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  /**
   * Renders a single post based on the provided ID.
   *
   * @async
   * @function displayPostWithId
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @returns {Promise<void>}
   */
  displayPostWithId: async (req, res, next) => {
    try {
      const post = await Post.withId(req.params.id);

      console.log("Post: ", post);
      if (!post) {
        next({ status: 404, message: "Post not found" });
        return;
      }

      res.render("posts/post", { post });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  /**
   * Renders the form for creating or editing a post.
   *
   * @async
   * @function displayForm
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @returns {Promise<void>}
   */
  displayForm: async (req, res, next) => {
    console.log("In display form");
    try {
      if (!req.params.id) {
        res.render("posts/postsForm");
        return;
      }

      const post = await Post.withId(req.params.id);
      if (!post) {
        next({ status: 404, message: "Post not found" });
        return;
      }

      res.render("posts/postsForm", { existing_post: post });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  /**
   * Creates a new post using the title and content provided.
   *
   * @async
   * @function createPost
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @returns {Promise<void>}
   */
  createPost: async (req, res) => {
    const { title, content } = req.body;
    if (!title) return endBadRequest();
    try {
      let post = new Post(title, content, req.session.user);
      await post.save();

      endSuccess(res);
    } catch (err) {
      console.error(err);
      endInternalError(res);
    }
  },

  /**
   * Updates an existing post.
   *
   * @async
   * @function updatePost
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @returns {Promise<void>}
   */
  updatePost: async (req, res) => {
    if (!ensureId(req, res)) {
      return;
    }

    const post = await Post.withId(req.params.id);
    console.log("Found Post:", post);
    console.log("Type: ", typeof post);

    if (
      req.session.user.username !== post.author &&
      req.session.user.role !== Roles.ADMIN
    ) {
      res.writeHead(403, { "Content-Type": "text/plain" });
      res.end("Forbidden");
      return;
    }

    const { title, content } = req.body;
    try {
      await post.update(title, content);
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Post updated successfully");
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  },

  /**
   * Publishes a post by setting its status to published.
   *
   * @async
   * @function publishPost
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @returns {Promise<void>}
   */
  publishPost: async (req, res) => {
    await changePostStatus(req, res, Statusse.PUBLISHED);
  },

  /**
   * Archives a post by setting its status to archived.
   *
   * @async
   * @function archivePost
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @returns {Promise<void>}
   */
  archivePost: async (req, res) => {
    await changePostStatus(req, res, Statusse.ARCHIVED);
  },

  /**
   * Deletes a post.
   *
   * @async
   * @function deletePost
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @returns {Promise<void>}
   */
  deletePost: async (req, res) => {
    if (!ensureId(req, res)) {
      return;
    }

    const post = await Post.withId(req.params.id);
    if (!post) {
      endNotFound(res, "Post not found");
      return;
    }

    try {
      await post.delete();
      endSuccess(res, "Post deleted successfully");
    } catch (err) {
      console.error(err);
      endInternalError(res);
    }
  },
};

/**
 * Changes the status of a post.
 *
 * @private
 * @async
 * @function changePostStatus
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {string} status - New status value.
 * @returns {Promise<void>}
 */
async function changePostStatus(req, res, status) {
  if (!ensureId(req, res)) {
    return;
  }

  const post = await Post.withId(req.params.id);
  if (!post) {
    endNotFound(res, "Post not found");
    return;
  }

  try {
    await post.changeStatus(status);
    endSuccess(res, "Status changed successfully");
  } catch (err) {
    console.error(err);
    endInternalError(res);
  }
}

/**
 * Ensures that the request contains a valid post ID.
 *
 * @private
 * @function ensureId
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {boolean} Returns true if a valid ID is present; false otherwise.
 */
function ensureId(req, res) {
  if (!req.params.id) {
    endBadRequest(res);
    return false;
  }
  return true;
}
