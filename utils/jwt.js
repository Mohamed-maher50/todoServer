const jwt = require("jsonwebtoken");
const createToken = async (data) => {
  try {
    const token = await jwt.sign({ data }, process.env.SECRET_KEY_JWT);
    return token;
  } catch (error) {
    return undefined;
  }
};
module.exports = {
  createToken,
};
