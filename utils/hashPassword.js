const bcryptjs = require("bcryptjs");

const hastPassword = async (password) => {
  const salt = await bcryptjs.genSalt();
  const hastedPassword = await bcryptjs.hash(password, salt);
  return hastedPassword;
};
const verifyPassword = async (password, hashed) => {
  const checkResult = await bcryptjs.compare(password, hashed);
  if (!checkResult) return false;
  return true;
};
module.exports = {
  hastPassword,
  verifyPassword,
};
