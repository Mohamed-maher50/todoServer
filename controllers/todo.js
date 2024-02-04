const { validationResult } = require("express-validator");
const User = require("../models/userSchema");
const Todo = require("../models/todoSchema");
const createTodo = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) return res.status(400).json(error.array());
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(401).json([{ msg: "unauthorized" }]);

    const todo = await new Todo({
      owner: user._id,
      ...req.body,
    }).save();

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ msg: "some error" });
  }
};
const completedTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) return res.status(400).json([{ msg: "can't found this todo" }]);

    if (todo.owner == req.userId)
      await todo.updateOne({
        isDone: !todo.isDone,
      });
    else return res.status(401).json([{ msg: "unauthorized" }]);
    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({ msg: "can't handle request" });
  }
};
const editTodo = async (req, res) => {
  const errors = validationResult(req);
  const { id } = req.params;
  if (!errors.isEmpty()) return res.status(400).json(errors.array());
  try {
    const todo = await Todo.findById(id);
    if (todo.owner == req.userId)
      await todo.updateOne(
        {
          $set: req.body,
        },
        { new: true }
      );
    else return res.status(401).json([{ msg: "unauthorized" }]);
    res.status(200).json("dome");
  } catch (error) {
    res.status(500).json({ msg: "some error" });
  }
};
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (todo.owner == req.userId) {
      const isDeleted = await todo.deleteOne();
    } else return res.status(401).json([{ msg: "unauthorized" }]);
    res.status(200).json("dome");
  } catch (error) {
    res.status(500).json({ msg: "some error" });
  }
};
const getTodos = async (req, res) => {
  const { limit, skip, isDone } = req.query;
  try {
    const todos = await Todo.find({
      owner: req.userId,
      isDone: Boolean(isDone),
    })
      .skip(skip ?? 0)
      .limit(limit ?? 0);

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ msg: "some error" });
  }
};
module.exports = {
  createTodo,
  completedTodo,
  editTodo,
  deleteTodo,
  getTodos,
};
