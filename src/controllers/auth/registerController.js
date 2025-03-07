import User from "../../models/user.js";

export const registerController = {
  handleGetRequest: async (req, res, next) => {
    try {
      res.render("auth/register");
    } catch (err) {
      next(err);
    }
  },

  handlePostRequest: async (req, res) => {
    const { firstName, lastName, username, password, role } = req.body;

    let user;
    if (role) {
      user = new User(firstName, lastName, username, role);
    } else {
      user = new User(firstName, lastName, username);
    }

    const success = await user.registerUser(password);

    if (success) {
      // if "role" was passed in the body, user was created from admin
      // panel, so we shouldn't log him in
      if (!role) {
        req.session.user = user;
      }
      res.status(200).json(user);
    } else {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("User already exists");
    }
  },
};
