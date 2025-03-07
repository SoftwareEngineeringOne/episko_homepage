import path from "node:path";
import fs from "node:fs/promises";
import crypto from "node:crypto";
import { Roles } from "./user.js";

const postsFile = path.join(process.cwd(), "src", "data", "posts.json");

/** @typedef {string} Status */
export const Status = Object.freeze({
  PUBLISHED: "published",
  PENDING: "pending",
  ARCHIVED: "archived",
  REJECTED: "rejected",
});

class Post {
  /**
   * @param {string} title
   * @param {string} content
   * @param {User} author
   */
  constructor(title, content, author) {
    /** @type {string} */
    this.id = crypto.randomBytes(24).toString("hex");
    /** @type {string} */
    this.title = title;
    /** @type {string} */
    this.content = content;
    /** @type {string} */
    this.author = author;
    /** @type {Date} */
    this.createdAt = new Date();

    if (author.role === Roles.ADMIN) {
      /** @type {Status} */
      this.status = Status.PUBLISHED;
    } else {
      /** @type {Status} */
      this.status = Status.PENDING;
    }
  }

  /**
   * Creates a Post instance from a plain object.
   * @param {Object} obj
   * @returns {Post}
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
    const post = new Post(obj.title, obj.content, obj.author);
    post.id = obj.id;
    post.createdAt = new Date(obj.createdAt);
    post.status = obj.status;
    return post;
  }

  /**
   * Retrieves all posts from the database.
   * @returns {Promise<Post[]>}
   */
  static async getAll() {
    try {
      const data = await fs.readFile(postsFile, "utf8");
      return JSON.parse(data).map((post) => Post.fromObject(post));
    } catch (err) {
      console.error("Error getting posts:", err);
      throw err;
    }
  }

  static async getPublic() {
    try {
      const data = await fs.readFile(postsFile, "utf8");
      const posts = JSON.parse(data);
      return posts
        .filter((post) => post.status === Status.PUBLISHED)
        .map((post) => Post.fromObject(post));
    } catch (err) {
      console.error("Error getting posts:", err);
      throw err;
    }
  }

  static async getWithId(id) {
    try {
      const data = await fs.readFile(postsFile, "utf8");
      const posts = JSON.parse(data);
      return Post.fromObject(posts.find((post) => post.id === id));
    } catch (err) {
      console.error("Error getting post:", err);
      throw err;
    }
  }

  static async getByAuthor(author) {
    try {
      const data = await fs.readFile(postsFile, "utf8");
      const posts = JSON.parse(data);
      return posts
        .filter((post) => post.author === author)
        .map((post) => Post.fromObject(post));
    } catch (err) {
      console.error("Error getting post:", err);
      throw err;
    }
  }

  /**
   * Saves a post to the database.
   * @returns {Promise<void>}
   */
  async save() {
    try {
      const data = await fs.readFile(postsFile, "utf8");
      const posts = JSON.parse(data);
      posts.push(this);
      await fs.writeFile(postsFile, JSON.stringify(posts, null, 2));
    } catch (err) {
      console.error("Error saving post:", err);
      throw err;
    }
  }

  async update(title, content) {
    try {
      const data = await fs.readFile(postsFile, "utf8");
      const posts = JSON.parse(data);
      const post = posts.find((post) => post.id === this.id);

      post.title = title;
      post.content = content;
      await fs.writeFile(postsFile, JSON.stringify(posts, null, 2));
    } catch (err) {
      console.error("Error updating post:", err);
      throw err;
    }
  }

  /**
   *
   * @param {Status} status
   * @returns {Promise<void>}
   */
  async changeStatus(status) {
    try {
      const data = await fs.readFile(postsFile, "utf8");
      const posts = JSON.parse(data);
      const post = posts.find((post) => post.id === this.id);
      post.status = status;
      await fs.writeFile(postsFile, JSON.stringify(posts, null, 2));
    } catch (err) {
      console.error("Error publishing post:", err);
      throw err;
    }
  }

  async delete() {
    try {
      const data = await fs.readFile(postsFile, "utf8");
      const posts = JSON.parse(data);
      const index = posts.findIndex((post) => post.id === this.id);
      posts.splice(index, 1);
      await fs.writeFile(postsFile, JSON.stringify(posts, null, 2));
    } catch (err) {
      console.error("Error deleting post:", err);
      throw err;
    }
  }
}

export default Post;
