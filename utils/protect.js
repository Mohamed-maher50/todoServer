const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const Users = require("../models/userSchema");
const protect = async (req, res, next) => {
  try {
    var token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json("user not logged in");
    const { data } = await jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!data) return res.status(401).json("user not logged in");
    const user = await Users.findById(data);
    if (!user) return res.status(401).json([{ msg: "unauthorized" }]);
    req.user = user;
    next();
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};
const isId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = { protect, isId };
