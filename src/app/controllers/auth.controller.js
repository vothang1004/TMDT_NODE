const bcrypt = require("bcrypt");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const mailer = require("../../utils/mailer");
const generateRandomString = require("../../utils/generateRandomString");

const authController = {
  // generate access token
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "30d" }
    );
  },
  // register
  async registerUser(req, res) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      // create new user
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });
      // save to database
      const user = await newUser.save();
      const { password, ...userSend } = user.toObject();
      await mailer.sendMail(
        user.email,
        "Đăng ký thành công tài khoản với Fshare TMDT",
        `<h1>Chúc mừng bạn đã đăng ký tài khoản thành công</h1>`
      );
      res.status(200).json(userSend);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // login
  async loginUser(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(404).json("Wrong email");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(404).json("Wrong password");
      }
      if (user && validPassword) {
        const { password, ...userToSend } = user.toObject();
        const token = authController.generateAccessToken(user);
        res.status(200).json({ user: userToSend, token });
      }
    } catch (error) {
      res.status(500).json("Have an error");
    }
  },
  // reset password
  async resetPassword(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const newPassword = generateRandomString(6);
        await mailer.sendMail(
          user.email,
          "Khôi phục mật khẩu",
          `<p>Mật khẩu mới của bạn là ${newPassword}</p>`
        );
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(newPassword, salt);
        await User.updateOne({ id: user._id }, { password: hashed });
        res.status(200).json("Vui lòng kiểm tra email để lấy mật khẩu mới");
      }
    } catch (error) {}
  },
};
module.exports = authController;
