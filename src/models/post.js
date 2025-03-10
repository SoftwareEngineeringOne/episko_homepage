/**
 * @module models/post
 * @description Model representing blog posts.
 *
 * @requires node:fs/promises
 * @requires node:crypto
 * @requires node:path
 * @requires ./user.js
 * @requires ../util/data.js
 */

import fs from "node:fs/promises";
import crypto from "node:crypto";
import path from "node:path";
import { Roles } from "./user.js";
import { findEntryInData, readAndParseData } from "../util/data.js";

const postsFile = path.join(process.cwd(), "data", "posts.json");

/**
 * @typedef {string} Status
 */

/**
 * @typedef {Object} Statusse
 * @property {Status} PUBLISHED - The published status.
 * @property {Status} PENDING - The pending status.
 * @property {Status} ARCHIVED - The archived status.
 * @property {Status} REJECTED - The rejected status.
 */

/**
 * @type {Readonly<Statusse>}
 */
export const Statusse = Object.freeze({
  /** @type {Status} */
  PUBLISHED: "published",
  /** @type {Status} */
  PENDING: "pending",
  /** @type {Status} */
  ARCHIVED: "archived",
  /** @type {Status} */
  REJECTED: "rejected",
});

/**
 * @typedef {Object} User
 * @property {string} username - The username of the user.
 * @property {string} role - The role of the user (placeholder type).
 */

/**
 * Class representing a post.
 */
class Post {
  /**
   * Creates a new Post instance.
   *
   * @param {string} title - The title of the post.
   * @param {string} content - The content of the post.
   * @param {User} author - The author of the post.
   */
  constructor(title, content, author) {
    /** @type {string} */
    this.id = crypto.randomBytes(24).toString("hex");
    /** @type {string} */
    this.title = title;
    /** @type {string} */
    this.content = content;
    /** @type {string} */
    this.author = author.username;
    /** @type {Date} */
    this.createdAt = new Date();

    if (author.role === Roles.ADMIN) {
      /** @type {Status} */
      this.status = Statusse.PUBLISHED;
    } else {
      /** @type {Status} */
      this.status = Statusse.PENDING;
    }
  }

  /**
   * Creates a Post instance from a plain object.
   *
   * @param {Object} obj - The plain object.
   * @param {string} obj.id - The id of the post.
   * @param {string} obj.title - The title of the post.
   * @param {string} obj.content - The content of the post.
   * @param {string} obj.author - The author's username.
   * @param {string} obj.createdAt - The creation date in string format.
   * @param {Status} obj.status - The status of the post.
   *
   * @returns {Post|null} The Post instance or null if invalid.
   */
  static fromObject(obj) {
    if (
      !obj ||
      !obj.id ||
      !obj.title ||
      !obj.content ||
      !obj.author ||
      !obj.createdAt ||
      !obj.status
    ) {
      return null;
    }
    const post = new Post(obj.title, obj.content, {}); // Placeholder for author object.
    post.author = obj.author;
    post.id = obj.id;
    post.createdAt = new Date(obj.createdAt);
    post.status = obj.status;
    return post;
  }

  /**
   * Retrieves all posts.
   *
   * @returns {Promise<Post[]>} A promise resolving to an array of Post instances.
   *
   * @throws {Error} If an error occurs while reading the file.
   */
  static async getAll() {
    try {
      return await readAndParseData(postsFile, (post) => Post.fromObject(post));
    } catch (err) {
      console.error("Error getting posts:", err);
      throw err;
    }
  }

  /**
   * Retrieves all public posts.
   *
   * @returns {Promise<Post[]>} A promise resolving to an array of published Post instances.
   *
   * @throws {Error} If an error occurs while reading the file.
   */
  static async getPublic() {
    try {
      const posts = await readAndParseData(postsFile);
      return posts
        .filter((post) => post.status === Statusse.PUBLISHED)
        .map((post) => Post.fromObject(post));
    } catch (err) {
      console.error("Error getting posts:", err);
      throw err;
    }
  }

  /**
   * Retrieves a post by its id.
   *
   * @param {string} id - The id of the post.
   *
   * @returns {Promise<Post|null>} A promise resolving to the Post instance if found, otherwise null.
   *
   * @throws {Error} If an error occurs during retrieval.
   */
  static async withId(id) {
    try {
      const obj = await findEntryInData(postsFile, (post) => post.id === id);
      return Post.fromObject(obj);
    } catch (err) {
      console.error("Error getting post:", err);
      throw err;
    }
  }

  /**
   * Retrieves all posts by an author.
   *
   * @param {string} author - The author's username.
   *
   * @returns {Promise<Post[]>} A promise resolving to an array of Post instances by the author.
   *
   * @throws {Error} If an error occurs during retrieval.
   */
  static async withAuthor(author) {
    try {
      const posts = await readAndParseData(postsFile);
      return posts
        .filter((post) => post.author === author)
        .map((post) => Post.fromObject(post));
    } catch (err) {
      console.error("Error getting post:", err);
      throw err;
    }
  }

  /**
   * Saves the current post.
   *
   * @returns {Promise<void>} A promise that resolves when the post is saved.
   *
   * @throws {Error} If an error occurs during the save operation.
   */
  async save() {
    try {
      const posts = await readAndParseData(postsFile);
      posts.push(this);
      await savePosts(posts);
    } catch (err) {
      console.error("Error saving post:", err);
      throw err;
    }
  }

  /**
   * Updates the post with a new title and content.
   *
   * @param {string} title - The new title.
   * @param {string} content - The new content.
   *
   * @returns {Promise<void>} A promise that resolves when the update is complete.
   *
   * @throws {Error} If an error occurs during the update.
   */
  async update(title, content) {
    try {
      // "findEntryInData()" is not used, since the single post and
      // all posts are needed.
      const posts = await readAndParseData(postsFile);
      const post = posts.find((post) => post.id === this.id);
      post.title = title;
      post.content = content;
      await savePosts(posts);
    } catch (err) {
      console.error("Error updating post:", err);
      throw err;
    }
  }

  /**
   * Changes the status of the post.
   *
   * @param {Status} status - The new status for the post.
   *
   * @returns {Promise<void>} A promise that resolves when the status is changed.
   *
   * @throws {Error} If an error occurs during the status change.
   */
  async changeStatus(status) {
    this.status = status;
    try {
      const posts = await readAndParseData(postsFile);
      const post = posts.find((post) => post.id === this.id);
      post.status = status;
      await savePosts(posts);
    } catch (err) {
      console.error("Error publishing post:", err);
      throw err;
    }
  }

  /**
   * Deletes the post.
   *
   * @returns {Promise<void>} A promise that resolves when the post is deleted.
   *
   * @throws {Error} If an error occurs during deletion.
   */
  async delete() {
    try {
      const posts = await readAndParseData(postsFile);
      const index = posts.findIndex((post) => post.id === this.id);
      posts.splice(index, 1);
      await savePosts(posts);
    } catch (err) {
      console.error("Error deleting post:", err);
      throw err;
    }
  }
}

/**
 * Saves posts to the data file.
 *
 * @private
 *
 * @param {Post[]} posts - An array of Post instances to be saved.
 *
 * @returns {Promise<void>} A promise that resolves when posts are written.
 *
 * @throws {Error} If an error occurs while writing to the file.
 */
async function savePosts(posts) {
  try {
    await fs.writeFile(postsFile, JSON.stringify(posts, null, 2));
  } catch (err) {
    console.error("Error saving users:", err);
    throw err;
  }
}

export default Post;
