const { default: mongoose } = require("mongoose");
const { FORBIDDEN } = require("../constants/ErrorsType");
const ErrorHandler = require("../utils/ErrorHandler");

const TasksModel = require("./TasksSchema");
const ProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
ProjectSchema.pre(
  "deleteOne",
  {
    document: true,
  },
  async function (next) {
    const checkIfHasTasks = await TasksModel.findOne({
      user: this.user,
      project: this._id,
    });

    if (checkIfHasTasks)
      return next(
        new ErrorHandler(
          FORBIDDEN,
          "Delete all tasks related to this project.",
          403
        )
      );
    next();
  }
);
module.exports = mongoose.model("Projects", ProjectSchema);
