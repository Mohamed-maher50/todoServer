const { body, check } = require("express-validator");
const {
  ValidatorMiddleware,
} = require("../../middlewares/ValidatorMiddleware");

exports.newTaskValidator = [
  body("task").trim().notEmpty().withMessage("task name is required"),
  body("note").optional().trim().notEmpty().withMessage("note is required"),
  body("mustCompleteDate")
    .trim()
    .notEmpty()
    .withMessage("must complete date is required")
    .withMessage("must complete date is required")
    .isISO8601()
    .toDate(),
  body("project")
    .trim()
    .notEmpty()
    .withMessage("project required")
    .isMongoId()
    .withMessage("not valid project id"),
  ValidatorMiddleware,
];

exports.deleteTaskStatusValidator = [
  check("id").isMongoId().withMessage("not valid id"),
  ValidatorMiddleware,
];
exports.updateTaskStatusValidator = [
  check("id").isMongoId().withMessage("not valid id"),
  body("isDone").optional().isBoolean().withMessage("is done must be boolean"),
  ValidatorMiddleware,
];
