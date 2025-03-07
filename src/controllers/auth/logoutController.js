export const logoutController = {
  handlePostRequest: async (req, res) => {
    //! TODO ErrorHandling
    req.session.destroy();
    res.end("User logged out successfully");
  },
};
