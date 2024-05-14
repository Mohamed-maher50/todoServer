const { body, check } = require("express-validator");
const {
  ValidatorMiddleware,
} = require("../../middlewares/ValidatorMiddleware");
const ProjectModel = require("../../models/ProjectSchema");
exports.newProjectValidator = [
  body("projectName").custom(async (value, { req }) => {
    const project = await ProjectModel.findOne({
      projectName: value,
      user: req.user._id,
    });
    if (project)
      return Promise.reject("project name already exists in your account");
    return true;
  }),
  ValidatorMiddleware,
];
exports.deleteProjectValidator = [
  check("id").isMongoId().withMessage("not valid id"),
  ValidatorMiddleware,
];
exports.updateProjectValidator = [
  check("id").isMongoId().withMessage("not valid id"),
  body("projectName").optional({}).trim().notEmpty().withMessage("not valid"),

  ValidatorMiddleware,
];
