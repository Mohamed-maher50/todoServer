const { default: mongoose } = require("mongoose");

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
        new Error(
          "there are tasks related to this project delete all tasks first",
          {
            cause: 400,
          }
        )
      );
    next();
  }
);
module.exports = mongoose.model("Projects", ProjectSchema);
