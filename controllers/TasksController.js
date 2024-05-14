const expressAsyncHandler = require("express-async-handler");
const Tasks = require("../models/TasksSchema");
const newTask = expressAsyncHandler(async (req, res) => {
  await new Tasks({
    user: req.user._id,
    mustCompleteDate: req.body.mustCompleteDate,
    project: req.body.project,
    note: req.body.note,
    task: req.body.task,
  }).save();
  res.sendStatus(200);
});
const ToggleCompletedTask = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const todo = await Tasks.findById(id);
  if (!todo) return next(new Error("Task not found"));
  if (todo.user != req.user.id)
    return res.status(401).json({ msg: "unable to perform this task" });
  const data = await todo.updateOne(
    {
      isDone: !todo.isDone,
    },
    { new: true }
  );
  res.status(200).json({ data });
});

const updateTask = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const task = await Tasks.findById(id);

  if (!task) return next(new Error("Task not found"));
  if (task.user != req.user.id)
    return next(new Error("can't update this task"));
  const afterUpdate = await task.updateOne(
    {
      $set: req.body,
    },
    {
      new: true,
    }
  );
  res.status(202).json({ data: afterUpdate });
});

const deleteTask = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Tasks.findById(id);
  if (!task) return next(new Error("not found task with this id"));
  if (task.user != req.user.id)
    return next(new Error("You are not allowed to delete"));
  await task.deleteOne();
  res.sendStatus(204);
});
const getTasks = expressAsyncHandler(async (req, res) => {
  let filtrationQueryString = req.query;
  // pagination
  const limit = req.query.limit || 3;
  const pageNum = req.query.page || 1;
  const skip = (pageNum - 1) * limit;
  const fields = req.query.fields || "";
  const paginationFields = ["limit", "skip", "page"];
  const sortFields = ["sort"];
  const extractFields = [...paginationFields, ...sortFields, "fields"];
  extractFields.forEach((field) => {
    delete filtrationQueryString[field];
  });
  let queryStr = JSON.stringify(filtrationQueryString);
  queryStr = queryStr.replace(
    /\b(gte|gt|lte|lt|in)\b/g,
    (match) => `$${match}`
  );
  filtrationQueryString = JSON.parse(queryStr);
  // count Documents
  console.log(filtrationQueryString);
  const countOfDocuments = await Tasks.countDocuments();
  const tasks = await Tasks.find({
    user: req.user._id,
    ...filtrationQueryString,
  })
    .skip(skip)
    .limit(limit)
    .select(fields.split(",").join(" ", ","));

  res.status(200).json(tasks);
});
module.exports = {
  newTask,
  ToggleCompletedTask,
  updateTask,
  deleteTask,
  getTasks,
};
