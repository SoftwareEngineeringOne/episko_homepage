import fs from "node:fs/promises";
import path from "node:path";

import { findEntryInData, readAndParseData } from "../util/data.js";

const usersFile = path.join(process.cwd(), "src", "data", "users.json");

/**
 * @typedef {string} Role
 */

/**
 * @typedef {Object} Roles
 * @property {Role} ADMIN The admin role.
 * @property {Role} AUTHOR The author role.
 * @property {Role} USER The user role. (default)
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
   * Creates a new User object.
   *
   * @param {string} firstName The first name of the user.
   * @param {string} lastName The last name of the user.
   * @param {string} username The username of the user.
   * @param {Role} role The role of the user.
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

  /**
   * Creates a new User object from an object.
   *
   * @param {object} obj The object to create the User from.
   * @param {string} obj.firstName The first name of the user.
   * @param {string} obj.lastName The last name of the user.
   * @param {string} obj.username The username of the user.
   * @param {Role} obj.role The role of the user.
   * @returns {User|null} The created User object, or null if the object is invalid.
   */
  static fromObject(obj) {
    if (!obj || !obj.firstName || !obj.lastName || !obj.username || !obj.role) {
      return null;
    }
    return new User(obj.firstName, obj.lastName, obj.username, obj.role);
  }

  /**
   * Logs in a user.
   *
   * @param username The username of the user.
   * @param password The password of the user, encrypted on the frontend.
   *
   * @returns {Promise<User|null>} The user object if the user is found, or null if the user is not found.
   *
   * @throws {Error} If an error occurs while validating the user
   */
  static async loginUser(username, password) {
    try {
      const user = await findEntryInData(
        usersFile,
        (u) => u.username === username && u.password === password,
      );
      return user || null;
    } catch (err) {
      console.error("Error validating user:", err);
      throw err;
    }
  }

  /**
   * Gets all users.
   *
   * @returns {Promise<User[]>} The list of all users.
   *
   * @throws {Error} If an error occurs while getting the users.
   */
  static async getAll() {
    try {
      return await readAndParseData(usersFile, (user) => User.fromObject(user));
    } catch (err) {
      console.error("Error getting users:", err);
      throw err;
    }
  }

  /**
   * Gets a user by their username.
   *
   * @param username The username of the user to get.
   *
   * @returns {Promise<User|null>} The user object if the user is found, or null if the user is not found.
   *
   * @throws {Error} If an error occurs while getting the user.
   */
  static async withUsername(username) {
    try {
      const user = await findEntryInData(
        usersFile,
        (user) => user.username === username,
      );
      return User.fromObject(user);
    } catch (err) {
      console.error(`Error getting user with username ${username}: `, err);
      throw err;
    }
  }

  /**
   * Updates the role of the user.
   *
   * @param role The new role of the user.
   * @returns {Promise<void>} A promise that resolves when the role is updated.
   *
   * @throws {Error} If an error occurs while updating the role.
   */
  async updateRole(role) {
    this.role = role;
    try {
      const users = await readAndParseData(usersFile);
      const user = users.find((user) => user.username === this.username);

      user.role = role;

      await saveUsers(users);
    } catch (err) {
      console.error("Error updating role:", err);
      throw err;
    }
  }

  /**
   * Registers a new user.
   *
   * @param password The password of the user, encrypted on the frontend.
   *
   * @returns {Promise<boolean>} True if the user is registered, false if the user already exists or if the user is invalid.
   *
   * @throws {Error} If an error occurs while registering the user.
   */
  async registerUser(password) {
    if (!this.firstName || !this.lastName || !this.username || !password) {
      return false;
    }

    try {
      const users = await readAndParseData(usersFile);

      if (users.some((u) => u.username === this.username)) {
        return false;
      }

      users.push({
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        password,
        role: this.role,
      });

      await saveUsers(users);

      return true;
    } catch (err) {
      console.error("Error creating user:", err);
      throw err;
    }
  }

  /**
   * Deletes the user.
   *
   * @returns {Promise<void>} A promise that resolves when the user is deleted.
   *
   * @throws {Error} If an error occurs while deleting the user.
   */
  async delete() {
    try {
      const users = await readAndParseData(usersFile);
      const index = users.findIndex((user) => user.username === this.username);
      users.splice(index, 1);
      await saveUsers(users);
    } catch (err) {
      console.error("Error deleting user:", err);
      throw err;
    }
  }
}

/**
 * Save users to the users file.
 *
 * @param {User[]} users The list of users to save.
 *
 * @returns {Promise<void>} A promise that resolves when the users are saved.
 */
async function saveUsers(users) {
  try {
    await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error("Error saving users:", err);
    throw err;
  }
}

export default User;
