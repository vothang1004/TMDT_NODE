const User = require("../../models/User");

const userController = {
  // get all user
  async getAllUser(req, res) {
    try {
      const users = await User.find();
      if (users && users.length > 0) {
        res.status(200).json(users);
      } else {
        res.status(200).json([]);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async updateUser(req, res) {
    try {
      let user = await User.findById(req.params.id);
      if (user) {
        user.username = req.body.username;
        user.save();
        res.status(200).json(user);
      } else {
        res.status(404).json("User not found");
      }
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },
};
module.exports = userController;
