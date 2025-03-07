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
  constructor(firstName, lastName, username, role = Roles.USER) {
    /** @type {string} */
    this.firstName = firstName;

    /** @type {string} */
    this.lastName = lastName;

    /** @type {string} */
    this.username = username;

    /** @type {Role} */
    this.role = role;
  }

  static fromObject(obj) {
    if (!obj || !obj.firstName || !obj.lastName || !obj.username || !obj.role) {
      return null;
    }
    return new User(obj.firstName, obj.lastName, obj.username, obj.role);
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

  async updateRole(role) {
    this.role = role;
    try {
      const data = await fs.readFile(usersFile, "utf8");
      const users = JSON.parse(data);
      const user = users.find((user) => user.username === this.username);

      user.role = role;
      await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
    } catch (err) {
      console.error("Error updating role:", err);
      throw err;
    }
  }

  static async getAll() {
    try {
      const data = await fs.readFile(usersFile, "utf8");
      return JSON.parse(data).map((user) => User.fromObject(user));
    } catch (err) {
      console.error("Error getting users:", err);
      throw err;
    }
  }

  static async getWithUsername(username) {
    try {
      const data = await fs.readFile(usersFile, "utf8");
      const users = JSON.parse(data);
      const user = users.find((user) => user.username == username);
      return User.fromObject(user);
    } catch (err) {
      console.error(`Error getting user with username ${username}: `, err);
      throw err;
    }
  }

  /**
   * Registers a new user.
   * @param password
   * @returns {Promise<boolean>}
   */
  async registerUser(password) {
    if (!this.firstName || !this.lastName || !this.username || !password) {
      return false;
    }

    try {
      const data = await fs.readFile(usersFile, "utf8");
      const users = JSON.parse(data);

      // Check if user already exists
      if (users.some((u) => u.username === this.username)) {
        return false;
      }

      // Add new user
      users.push({
        firstName: this.firstName,
        lastName: this.lastName,
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

  async delete() {
    try {
      const data = await fs.readFile(usersFile, "utf8");
      const users = JSON.parse(data);
      const index = users.findIndex((user) => user.username === this.username);
      users.splice(index, 1);
      await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
    } catch (err) {
      console.error("Error deleting user:", err);
      throw err;
    }
  }
}

export default User;
