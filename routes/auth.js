const { body } = require("express-validator");
const { login, signUp } = require("../controllers/auth");

const router = require("express").Router();
router.post(
  "/login",
  body("email")
    .trim()
    .not()
    .isEmpty()
    .isString()
    .isEmail()
    .withMessage("not valid"),
  body("password").trim().not().isEmpty(),
  login
);

router.post(
  "/signUp",
  body("fullName")
    .trim()
    .not()
    .isEmpty()
    .isString()
    .isLength({
      min: 5,
    })
    .withMessage("small name"),
  body("email")
    .trim()
    .not()
    .isEmpty()
    .isString()
    .isEmail()
    .withMessage("not valid"),
  body("birthDay").isISO8601().toDate(),
  body("password")
    .trim()
    .not()
    .isEmpty()
    .isLength({
      min: 7,
    })
    .withMessage("password must be > 7"),
  signUp
);

module.exports = router;
