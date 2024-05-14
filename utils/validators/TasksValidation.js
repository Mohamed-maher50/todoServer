const { body, check } = require("express-validator");
const {
  ValidatorMiddleware,
} = require("../../middlewares/ValidatorMiddleware");

exports.newTaskValidator = [
  body("task").trim().not().isEmpty().withMessage("task is required"),
  body("note").optional(),
  body("mustCompleteDate").trim().notEmpty().isISO8601().toDate(),
  body("project")
    .trim()
    .notEmpty()
    .isMongoId()
    .withMessage("not valid project id"),
  ValidatorMiddleware,
];
exports.toggleTaskStatusValidator = [
  check("id").isMongoId().withMessage("not valid id"),
  ValidatorMiddleware,
];
exports.deleteTaskStatusValidator = [
  check("id").isMongoId().withMessage("not valid id"),
  ValidatorMiddleware,
];
exports.updateTaskStatusValidator = [
  check("id").isMongoId().withMessage("not valid id"),
  ValidatorMiddleware,
];
