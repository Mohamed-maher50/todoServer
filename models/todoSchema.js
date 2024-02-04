const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Todo", schema);
