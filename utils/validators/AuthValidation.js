const User = require("../../models/userSchema");
const {
  ValidatorMiddleware,
} = require("../../middlewares/ValidatorMiddleware");
const { body } = require("express-validator");
const { verifyPassword } = require("../hashPassword");
exports.SignUPValidator = [
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
    .withMessage(" email is required")
    .isEmail()
    .withMessage("not valid email")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) return Promise.reject("this email already exist");
      return true;
    }),

  body("password")
    .trim()
    .not()
    .isEmpty()
    .isLength({
      min: 7,
    })
    .withMessage("password must be > 7"),
  ValidatorMiddleware,
];
exports.SignInValidator = [
  body("email")
    .trim()
    .not()
    .isEmpty()
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: value });
      if (!user) return Promise.reject("can't find this email");
      req.user = user;
      return true;
    })
    .isEmail()
    .withMessage("not valid"),
  body("password")
    .trim()
    .not()
    .isEmpty()
    .isLength({
      min: 7,
    })
    .withMessage("password must be > 7")
    .custom(async (value, { req }) => {
      if (!req.user) return true;
      if (!(await verifyPassword(value, req.user?.password)))
        return Promise.reject("wrong password");
      return true;
    }),

  ValidatorMiddleware,
];
