const { validationResult } = require("express-validator");
const User = require("../models/userSchema");
const { verifyPassword } = require("../utils/hashPassword");
const { createToken } = require("../utils/jwt");

const login = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors.array());
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json([{ msg: "this account dons't exist" }]);
    if (!(await verifyPassword(password, user.password)))
      return res
        .status(400)
        .json([{ msg: "password not Correct", param: "password" }]);

    const token = await createToken(user._id);
    res.status(200).json({
      jwt: token,
      user: { fullName: user.fullName, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "can not make request" });
  }
};
const signUp = async (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors.array());
  try {
    const checkIsAlreadyUse = await User.findOne({ email: email });
    if (checkIsAlreadyUse)
      return res
        .status(400)
        .json([{ msg: "this email already exist", param: "email" }]);
    const user = await User.create({ ...req.body });

    const token = await createToken(user.id);
    if (!token)
      return res.status(500).json({ msg: "can't receive any request" });
    res.status(200).json({
      jwt: token,
      user: {
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: "can not make request" });
  }
};
module.exports = {
  login,
  signUp,
};
