const router = require("express").Router();
const { body } = require("express-validator");
const {
  createTodo,
  completedTodo,
  editTodo,
  deleteTodo,
  getTodos,
} = require("../controllers/todo");

const { protect } = require("../utils/protect");
router.post(
  "/create",
  body("todo").trim().not().isEmpty(),
  protect,
  createTodo
);
router.put("/completed/:id", protect, completedTodo);
router.put("/edit/:id", body("todo").trim().not().isEmpty(), protect, editTodo);
router.delete("/delete/:id", protect, deleteTodo);

router.get("/", protect, getTodos);

module.exports = router;
