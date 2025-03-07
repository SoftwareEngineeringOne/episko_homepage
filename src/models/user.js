import fs from "node:fs/promises";
import path from "node:path";

const usersFile = path.join(process.cwd(), "src", "data", "users.json");

/**
 * @typedef {string} Role
 */
/**
 * @typedef {Object} Roles
 * @property {Role} ADMIN
 * @property {Role} AUTHOR
 * @property {Role} USER
 */
/** @type {Readonly<Roles>} */
export const Roles = Object.freeze({
  /** @type {Role} */
  ADMIN: "admin",
  /** @type {Role} */
  AUTHOR: "author",
  /** @type {Role} */
  USER: "user",
});

/**
 * User class
 */
class User {
  /**
   * @param {string} username
   * @param {Role} role
   */
  constructor(username, role = Roles.USER) {
    /** @type {string} */
    this.username = username;
    /** @type {Role} */
    this.role = role;
  }

  /**
   * Logs in a user.
   * @param username
   * @param password
   * @returns {Promise<User|null>}
   */
  static async loginUser(username, password) {
    try {
      const data = await fs.readFile(usersFile, "utf8");
      const users = JSON.parse(data);

      const user = users.find(
        (u) => u.username === username && u.password === password,
      );
      console.log("User found:", user);
      console.log("Role:", user.role);
      console.log("Role type:", typeof user.role);

      return user || null;
    } catch (err) {
      console.error("Error validating user:", err);
      return null;
    }
  }

  static async getAll() {
    try {
      const data = await fs.readFile(usersFile, "utf8");
      return JSON.parse(data).map((user) => new User(user.username, user.role));
    } catch (err) {
      console.error("Error getting users:", err);
      throw err;
    }
  }

  /**
   * Registers a new user.
   * @param password
   * @returns {Promise<boolean>}
   */
  async registerUser(password) {
    if (!this.username || !password) return false;

    try {
      const data = await fs.readFile(usersFile, "utf8");
      const users = JSON.parse(data);

      // Check if user already exists
      if (users.some((u) => u.username === this.username)) {
        return false;
      }

      // Add new user
      users.push({
        username: this.username,
        password,
        role: this.role,
      });
      await fs.writeFile(usersFile, JSON.stringify(users, null, 2));

      return true;
    } catch (err) {
      console.error("Error creating user:", err);
      return false;
    }
  }
}

export default User;
