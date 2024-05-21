const expressAsyncHandler = require("express-async-handler");
const { NotFoundDocument, FORBIDDEN } = require("../constants/ErrorsType");
const Tasks = require("../models/TasksSchema");
const ErrorHandler = require("../utils/ErrorHandler");
const refactor = require("./refactorController");
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

const updateTask = refactor.updateOne(Tasks);
const deleteTask = refactor.FindByIdAndDelete(Tasks);
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

  updateTask,
  deleteTask,
  getTasks,
};
