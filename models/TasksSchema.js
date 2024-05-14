const { default: mongoose } = require("mongoose");
const ProjectsModel = require("./ProjectSchema");
const TaskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    project: {
      type: mongoose.Types.ObjectId,
      ref: "Projects",
    },
    started: {
      type: Boolean,
      default: false,
    },
    mustCompleteDate: {
      type: Date,
      default: Date.now,
      get: (date) => date.toLocaleDateString("en-US"), // getter
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

TaskSchema.pre("save", async function (next) {
  if (!this.project) {
    const defaultProject = await ProjectsModel.findOne({
      projectName: "default",
      owner: this.owner,
    });
    this.project = defaultProject._id;
  }
  next();
});
module.exports = mongoose.model("Tasks", TaskSchema);
