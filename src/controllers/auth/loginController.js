import User from "../../models/user.js";

export const loginController = {
  handleGetRequest: async (req, res) => {
    try {
      res.render("auth/login");
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  },
  handlePostRequest: async (req, res) => {
    const { username, password } = req.body;

    const user = await User.loginUser(username, password);
    if (!user) {
      res.writeHead(401, { "Content-Type": "text/plain" });
      res.end("Invalid username or password");
      return;
    }

    req.session.user = user;

    res.end("User logged in successfully");
  },
};
