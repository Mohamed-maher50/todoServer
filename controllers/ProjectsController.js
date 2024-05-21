const expressAsyncHandler = require("express-async-handler");
const { NotFoundDocument } = require("../constants/ErrorsType");
const ProjectsModel = require("../models/ProjectSchema");
const ErrorHandler = require("../utils/ErrorHandler");
const newProject = expressAsyncHandler(async (req, res) => {
  const newProject = await new ProjectsModel({
    user: req.user._id,
    projectName: req.body.projectName,
  }).save();
  res.status(200).json({ data: newProject });
});

const updateProject = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const project = await ProjectsModel.findOneAndUpdate(
    {
      user: req.user.id,
      _id: id,
    },
    {
      $set: req.body,
    },
    {
      new: true,
    }
  );
  if (!project)
    return next(new ErrorHandler(NotFoundDocument, "not found project", 404));
  res.status(202).json(project);
});
const deleteProject = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const project = await ProjectsModel.findById(id);
  if (!project)
    return next(new ErrorHandler(NotFoundDocument, "not found project", 404));
  if (project.user != req.user.id)
    return next(new ErrorHandler(FORBIDDEN, "can't delete this project", 403));

  await project.deleteOne();
  res.status(200).json(project);
});
const getProjects = expressAsyncHandler(async (req, res) => {
  const projects = await ProjectsModel.find({
    user: req.user.id,
  });
  res.status(200).json(projects);
});

module.exports = {
  newProject,
  updateProject,
  deleteProject,
  getProjects,
};
