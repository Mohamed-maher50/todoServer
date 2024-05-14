const { login, signUp } = require("../controllers/auth");
const {
  SignUPValidator,
  SignInValidator,
} = require("../utils/validators/AuthValidation");

const router = require("express").Router();
router.post("/signIn", ...SignInValidator, login);
router.post("/signUp", ...SignUPValidator, signUp);

module.exports = router;
