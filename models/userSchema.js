const mongoose = require("mongoose");
const ProjectsModel = require("./ProjectSchema");
const { hastPassword } = require("../utils/hashPassword");
const ErrorHandler = require("../utils/ErrorHandler");
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full Name"],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password"],
  },
  fullName: String,
});

userSchema.pre("save", async function () {
  await new ProjectsModel({
    projectName: "default",
    user: this._id,
  });
  this.password = await hastPassword(this.password);
});
userSchema.post("save", async function (doc, next) {
  const defaultProject = await new ProjectsModel({
    projectName: "default",
    user: doc._id,
  }).save();
  if (defaultProject) return next();
  else next(new ErrorHandler(undefined, "can't create default project", 500));
});
module.exports = mongoose.model("User", userSchema);
