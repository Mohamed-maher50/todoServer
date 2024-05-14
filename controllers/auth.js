const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userSchema");
const { createToken } = require("../utils/jwt");

const login = expressAsyncHandler(async (req, res, next) => {
  const token = await createToken(req.user._id);
  res.status(200).json({
    TOKEN: token,
    user: {
      fullName: req.user.fullName,
      email: req.user.email,
    },
  });
});
const signUp = expressAsyncHandler(async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = await createToken(user.id);
  res.status(200).json({
    TOKEN: token,
    user: {
      fullName: user.fullName,
      email: user.email,
    },
  });
});
module.exports = {
  login,
  signUp,
};
