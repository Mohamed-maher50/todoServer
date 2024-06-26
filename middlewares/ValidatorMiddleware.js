const { validationResult } = require("express-validator");

exports.ValidatorMiddleware = (req, res, next) => {
  const error = validationResult(req).formatWith(({ msg }) => ({
    msg,
  }));
  console.log(error.isEmpty());
  if (error.isEmpty()) return next();
  const newError = new Error("Validation failed", { cause: 400 });
  newError.name = "ValidationError";
  newError.errors = error.array();
  next(newError);
};
