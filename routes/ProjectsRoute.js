const router = require("express").Router();
const {
  newProject,
  deleteProject,
  getProjects,
  updateProject,
} = require("../controllers/ProjectsController");

const { protect } = require("../utils/protect");
const {
  newProjectValidator,
  deleteProjectValidator,
  updateProjectValidator,
} = require("../utils/validators/ProjectsValidation");
router.use("/", protect);
router
  .route("/")
  .post(...newProjectValidator, newProject)
  .get(getProjects);
router
  .route("/:id")
  .delete(...deleteProjectValidator, deleteProject)
  .put(...updateProjectValidator, updateProject);

module.exports = router;
