const router = require("express").Router();
const {
  newTask,
  ToggleCompletedTask,
  deleteTask,
  getTasks,
  updateTask,
} = require("../controllers/TasksController");
const { protect } = require("../utils/protect");
const {
  newTaskValidator,

  updateTaskStatusValidator,
} = require("../utils/validators/TasksValidation");
router.post("/", ...newTaskValidator, protect, newTask);

router.put("/:id", ...updateTaskStatusValidator, protect, updateTask);
router.delete("/:id", protect, deleteTask);

router.get("/", protect, getTasks);

module.exports = router;
