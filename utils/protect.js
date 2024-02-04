const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const protect = async (req, res, next) => {
  try {
    var token = req.headers.authorization?.split(" ")[1];
    const { data } = await jwt.verify(token, process.env.SECRET_KEY_JWT);
    req.userId = data;

    next();
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};
const isId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = { protect, isId };
